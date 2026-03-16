import { NextRequest, NextResponse } from 'next/server';
import { dataManager } from '@/lib/data-manager';

// Simple in-memory storage for server-side rendering
const serverStorage: Record<string, any[]> = {};

function getServerCollection(collectionName: string): any[] {
  if (!serverStorage[collectionName]) {
    serverStorage[collectionName] = [];
  }
  return serverStorage[collectionName];
}

function setServerCollection(collectionName: string, data: any[]): void {
  serverStorage[collectionName] = data;
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    // Validate required fields
    const requiredFields = ['bookId', 'bookTitle', 'customerName', 'mobile', 'address', 'pinCode', 'quantity'];
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate mobile number format
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(orderData.mobile)) {
      return NextResponse.json(
        { error: 'Invalid mobile number format' },
        { status: 400 }
      );
    }

    // Validate pin code format
    const pinCodeRegex = /^\d{6}$/;
    if (!pinCodeRegex.test(orderData.pinCode)) {
      return NextResponse.json(
        { error: 'Invalid pin code format' },
        { status: 400 }
      );
    }

    // Validate quantity range
    if (orderData.quantity < 10 || orderData.quantity > 2000) {
      return NextResponse.json(
        { error: 'Quantity must be between 10 and 2000' },
        { status: 400 }
      );
    }

    // Add order to data manager or server storage
    let orderId: string;
    
    try {
      // Try to use data manager (client-side)
      orderId = dataManager.setDoc('orders', {
        ...orderData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });
    } catch (error) {
      // Fallback to server storage for server-side rendering
      const orders = getServerCollection('orders');
      const newOrder = {
        ...orderData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      orders.push(newOrder);
      setServerCollection('orders', orders);
      orderId = newOrder.id;
    }

    return NextResponse.json({
      success: true,
      orderId: orderId,
      message: 'Order saved successfully'
    });

  } catch (error) {
    console.error('Error saving order:', error);
    return NextResponse.json(
      { error: 'Failed to save order' },
      { status: 500 }
    );
  }
}
