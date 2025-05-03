import { ApiProperty } from '@nestjs/swagger';

export class CheckoutRequestType {
  @ApiProperty({ description: 'Order code for the checkout' })
  orderCode: number;

  @ApiProperty({ description: 'Total amount of the order' })
  amount: number;

  @ApiProperty({ description: 'Description of the order' })
  description: string;

  @ApiProperty({ description: 'URL to redirect when payment is cancelled' })
  cancelUrl: string;

  @ApiProperty({ description: 'URL to redirect when payment is successful' })
  returnUrl: string;

  @ApiProperty({
    description: 'Signature for payment verification',
    required: false,
  })
  signature?: string;

  @ApiProperty({
    description: 'List of items in the order',
    required: false,
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        quantity: { type: 'number' },
        price: { type: 'number' },
      },
    },
  })
  items?: {
    name: string;
    quantity: number;
    price: number;
  }[];

  @ApiProperty({ description: 'Name of the buyer', required: false })
  buyerName?: string;

  @ApiProperty({ description: 'Email of the buyer', required: false })
  buyerEmail?: string;

  @ApiProperty({ description: 'Phone number of the buyer', required: false })
  buyerPhone?: string;

  @ApiProperty({ description: 'Address of the buyer', required: false })
  buyerAddress?: string;

  @ApiProperty({
    description: 'Expiration timestamp of the payment',
    required: false,
  })
  expiredAt?: number;
}

export class WebhookDataDto {
  @ApiProperty({ description: 'Response code' })
  code: string;

  @ApiProperty({ description: 'Response description' })
  desc: string;

  @ApiProperty({ description: 'Success status' })
  success: boolean;

  @ApiProperty({ description: 'Webhook signature' })
  signature: string;

  @ApiProperty({ description: 'Webhook data' })
  data: {
    paymentId: string;
    orderCode: number;
    amount: number;
    description: string;
    transactionTime: string;
    status: string;
    paymentMethod: string;
    accountNumber: string;
    reference: string;
    transactionDateTime: string;
    currency: string;
    paymentChannel: string;
    paymentDestination: string;
    paymentSource: string;
    paymentLinkId: string;
    code: string;
    desc: string;
  };
}
