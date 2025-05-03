import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import * as crypto from 'crypto';
import * as querystring from 'qs';

@Injectable()
export class PaymentService {
  constructor(private configService: ConfigService) {}

  private sortObject(obj: any) {
    const sorted: any = {};
    const str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
  }

  async createPaymentUrl(amount: number, bankCode?: string, clientIp?: string) {
    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');
    const expireDate = moment(date).add(15, 'minutes').format('YYYYMMDDHHmmss');
    const orderId = moment(date).format('DDHHmmss');

    const vnp_Params: any = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: this.configService.get('VNP_TMNCODE'),
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: 'Thanh toan cho ma GD:' + orderId,
      vnp_OrderType: 'other',
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: this.configService.get('VNP_RETURNURL'),
      vnp_IpAddr: clientIp,
      vnp_CreateDate: createDate,
      vnp_ExpireDate: expireDate,
      vnp_SecureHashType: 'HmacSHA512',
    };

    if (bankCode) {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    const sortedParams = this.sortObject(vnp_Params);
    const signData = querystring.stringify(sortedParams, { encode: false });
    const secretKey = this.configService.get('VNP_HASHSECRET');
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;

    const vnpUrl =
      this.configService.get('VNP_URL') +
      '?' +
      querystring.stringify(vnp_Params, { encode: true });
    console.log('Final URL:', vnpUrl);

    return {
      vnpUrl,
      orderId,
    };
  }

  async verifyPayment(vnp_Params: any) {
    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    const sortedParams = this.sortObject(vnp_Params);
    const signData = querystring.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac(
      'sha512',
      this.configService.get('VNP_HASHSECRET'),
    );
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    return {
      isValid: secureHash === signed,
      responseCode: vnp_Params['vnp_ResponseCode'],
      orderId: vnp_Params['vnp_TxnRef'],
      amount: vnp_Params['vnp_Amount'] / 100,
    };
  }

  async queryTransaction(orderId: string, transDate: string) {
    const date = new Date();
    const vnp_RequestId = moment(date).format('HHmmss');
    const vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

    const data = `${vnp_RequestId}|2.1.0|querydr|${this.configService.get('VNP_TMNCODE')}|${orderId}|${transDate}|${vnp_CreateDate}|127.0.0.1|Truy van GD ma:${orderId}`;

    const hmac = crypto.createHmac(
      'sha512',
      this.configService.get('VNP_HASHSECRET'),
    );
    const vnp_SecureHash = hmac
      .update(Buffer.from(data, 'utf-8'))
      .digest('hex');

    const dataObj = {
      vnp_RequestId,
      vnp_Version: '2.1.0',
      vnp_Command: 'querydr',
      vnp_TmnCode: this.configService.get('VNP_TMNCODE'),
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Truy van GD ma:${orderId}`,
      vnp_TransactionDate: transDate,
      vnp_CreateDate: vnp_CreateDate,
      vnp_IpAddr: '127.0.0.1',
      vnp_SecureHash,
    };

    return dataObj;
  }

  async refund(
    orderId: string,
    transDate: string,
    amount: number,
    transType: string,
    user: string,
  ) {
    const date = new Date();
    const vnp_RequestId = moment(date).format('HHmmss');
    const vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

    const data = `${vnp_RequestId}|2.1.0|refund|${this.configService.get('VNP_TMNCODE')}|${transType}|${orderId}|${amount * 100}|0|${transDate}|${user}|${vnp_CreateDate}|127.0.0.1|Hoan tien GD ma:${orderId}`;

    const hmac = crypto.createHmac(
      'sha512',
      this.configService.get('VNP_HASHSECRET'),
    );
    const vnp_SecureHash = hmac
      .update(Buffer.from(data, 'utf-8'))
      .digest('hex');

    const dataObj = {
      vnp_RequestId,
      vnp_Version: '2.1.0',
      vnp_Command: 'refund',
      vnp_TmnCode: this.configService.get('VNP_TMNCODE'),
      vnp_TransactionType: transType,
      vnp_TxnRef: orderId,
      vnp_Amount: amount * 100,
      vnp_TransactionNo: '0',
      vnp_CreateBy: user,
      vnp_OrderInfo: `Hoan tien GD ma:${orderId}`,
      vnp_TransactionDate: transDate,
      vnp_CreateDate: vnp_CreateDate,
      vnp_IpAddr: '127.0.0.1',
      vnp_SecureHash,
    };

    return dataObj;
  }
}
