import { randomUUID } from "crypto";

export type FulfilmentStatus =
  | "Order received"
  | "Payment confirmed"
  | "Processing"
  | "Preparing for shipment"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Shipping review required";

export interface StoredOrder {
  reference: string;
  paymentProviderReference: string | null;
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    company: string | null;
  };
  shippingAddress: {
    line1: string;
    line2: string | null;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billingAddress: {
    line1: string;
    line2: string | null;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  products: Array<{
    productId: string;
    sku: string;
    supplierSku: string;
    title: string;
    size: string;
    capacity: string | number | null;
    finish: string;
    pieceCount: number;
    packageContents: string[];
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    shippingClass: string;
    packageWeight: unknown;
    packageDimensions: unknown;
    safetyVerificationStatus: string;
    sharpItem: boolean;
  }>;
  subtotal: number;
  shipping: number;
  shippingLabel: string;
  tax: number;
  total: number;
  paymentStatus: string;
  fulfilmentStatus: FulfilmentStatus;
  sharpNotice: boolean;
  storeMode: string;
  createdAt: string;
  updatedAt: string;
  webhookConfirmed: boolean;
  confirmationEmailSent?: boolean;
}

const globalStore = globalThis as typeof globalThis & {
  __northlineOrders?: Map<string, StoredOrder>;
};

function store() {
  if (!globalStore.__northlineOrders) {
    globalStore.__northlineOrders = new Map();
  }
  return globalStore.__northlineOrders;
}

export function createOrder(order: StoredOrder) {
  store().set(order.reference, order);
  if (order.paymentProviderReference) {
    store().set(`session:${order.paymentProviderReference}`, order);
  }
  return order;
}

export function getOrderByReference(reference: string) {
  return store().get(reference) ?? null;
}

export function getOrderBySession(sessionId: string) {
  return store().get(`session:${sessionId}`) ?? null;
}

export function updateOrder(reference: string, patch: Partial<StoredOrder>) {
  const existing = store().get(reference);
  if (!existing) return null;
  const next = {
    ...existing,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  store().set(reference, next);
  if (next.paymentProviderReference) {
    store().set(`session:${next.paymentProviderReference}`, next);
  }
  return next;
}

export function newSubmissionReference(prefix: string) {
  return `${prefix}-${randomUUID().slice(0, 8).toUpperCase()}`;
}
