<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TdSaleOrder;
use App\Models\TdSaleOrderItem;


class TdSaleOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $currentTimestamp = time();
        $currentDateTime = date('Y-m-d H:i:s', $currentTimestamp);

        $orders = [
            [
                'status' => 'Pending',
                'order_type' => 'Table',
                'payment_type' => 'Cash',
                'split_type' => 'Single',
                'table_no' => 1,
                'order_amount' => 1000,
                'discount' => 10,
                'products' => [
                    [
                        'md_product_id' => 1,
                        'qty' => 2,
                        'price' => 500,
                        'comment' => 'Comment 1',
                    ],
                    [
                        'md_product_id' => 2,
                        'qty' => 1,
                        'price' => 500,
                        'comment' => 'Comment 2',
                    ],
                ],
            ],
            [
                'status' => 'Completed',
                'order_type' => 'Takeaway',
                'payment_type' => 'Card',
                'split_type' => 'Split',
                'table_no' => null,
                'order_amount' => 2000,
                'discount' => 20,
                'products' => [
                    [
                        'md_product_id' => 3,
                        'qty' => 3,
                        'price' => 500,
                        'comment' => 'Comment 3',
                    ],
                ],
            ],
            [
                'status' => 'Pending',
                'order_type' => 'Table',
                'payment_type' => 'Cash',
                'split_type' => 'Single',
                'table_no' => 2,
                'order_amount' => 1500,
                'discount' => 15,
                'products' => [
                    [
                        'md_product_id' => 4,
                        'qty' => 2,
                        'price' => 500,
                        'comment' => 'Comment 4',
                    ],
                    [
                        'md_product_id' => 5,
                        'qty' => 1,
                        'price' => 500,
                        'comment' => 'Comment 5',
                    ],
                ],
            ],
            [
                'status' => 'Completed',
                'order_type' => 'Delivery',
                'payment_type' => 'Card',
                'split_type' => 'Single',
                'table_no' => null,
                'order_amount' => 2500,
                'discount' => 25,
                'products' => [
                    [
                        'md_product_id' => 6,
                        'qty' => 3,
                        'price' => 500,
                        'comment' => 'Comment 6',
                    ],
                ],
            ],
            [
                'status' => 'Pending',
                'order_type' => 'Takeaway',
                'payment_type' => 'Cash',
                'split_type' => 'Split',
                'table_no' => null,
                'order_amount' => 3000,
                'discount' => 30,
                'products' => [
                    [
                        'md_product_id' => 7,
                        'qty' => 2,
                        'price' => 500,
                        'comment' => 'Comment 7',
                    ],
                    [
                        'md_product_id' => 8,
                        'qty' => 1,
                        'price' => 500,
                        'comment' => 'Comment 8',
                    ],
                ],
            ],
        ];
        

        foreach ($orders as $order) {
            $data = new TdSaleOrder();
            $data->customer = 'Admin';
            $data->src = 'null';
            $data->order_type = $order['order_type'];
            $data->payment_type = $order['payment_type'];
            $data->split_type = $order['split_type'];;
            $data->table_no = $order['table_no'];;
            $data->order_amount = $order['order_amount'];
            $data->cancel_reason = null;
            $data->cancel_comment = null;
            $data->seat_no = null;
            $data->parent_order = null;
            $data->time = $currentDateTime;
            $data->user_id = 1;
            $data->discount = $order['discount'];
            $data->td_sale_order_code = $data->TdSaleOrderCode();
            $data->cd_client_id = 1;
            $data->cd_brand_id = 1;
            $data->cd_branch_id = 1;
            $data->is_active = 1;
            $data->created_by = 1;
            $data->updated_by = 1;
            $data->save();

            $latestOrderId = $data->td_sale_order_id;

            foreach ($order['products'] as $product) {
                $orderDetails = new TdSaleOrderItem();

                $orderDetails->md_product_id = $product['md_product_id'];
                $orderDetails->qty = $product['qty'];
                $orderDetails->price = $product['price'];
                $orderDetails->comment = $product['comment'];
                $orderDetails->cd_client_id = 1;
                $orderDetails->cd_brand_id = 1;
                $orderDetails->cd_branch_id = 1;
                $orderDetails->is_active = 1;
                $orderDetails->created_by = 1;
                $orderDetails->updated_by = '1';
                $orderDetails->td_sale_order_id = $latestOrderId;
                $orderDetails->save();
      
      }
    }
    }
}
