export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  author: string;
  publicationDate?: string;
  imageUrl: string;
  storagePath?: string;
  showInTicker?: boolean; 
}

export interface AppSettings {
    fontSize?: number;
    dailyWisdom?: DailyWisdom;
}

export interface SatsangVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  uploadDate: string;
  storagePath?: string;
  thumbnailUrl?: string;
  videoId?: string;
  isFeatured?: boolean;
  isLive?: boolean;
}

export interface SatguruBhajan {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  uploadDate: string;
  storagePath?: string;
  thumbnailUrl?: string;
  videoId?: string;
  lyrics?: string;
}


export interface SpiritualPhoto {
  id: string;
  title?: string;
  description?: string;
  imageUrl: string;
  uploadDate: string;
  folder?: string;
  storagePath?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  coverUrl: string;          // GitHub raw link (permanent)
  pdfUrl?: string;           // optional
  category?: string;
  stockStatus: 'in-stock' | 'out-of-stock' | 'read-only';
  altText?: string;
}

export interface Order {
  id: string;
  orderDate: string;
  status: string;
  name: string;
  mobile: string;
  address: string;
  pincode: string;
  bookTitle: string;
  quantity: number;
}

export interface FaqSubmission {
    id: string;
    name: string;
    email: string;
    question: string;
    submittedAt: string;
}

export interface DeekshaSubmission {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  pincode: string;
  deekshaType: 'pratham' | 'dvitiya';
  submittedAt: string;
}

export interface Feedback {
    id: string;
    name: string;
    email: string;
    message: string;
    submittedAt: string;
}

export interface KGFMember {
    id: string;
    name: string;
    fathersName: string;
    mobile: string;
    email: string;
    joinedAt: string;
}

export interface SaarSangrahPhoto {
  id: string;
  imageUrl: string;
  uploadDate: string;
  storagePath: string;
}

export interface ReferenceDocument {
  id: string;
  title: string;
  fileUrl: string;
  uploadDate: string;
  storagePath: string;
}

export interface FcmToken {
    id: string;
    subscribedAt: string;
}

export interface DailyWisdom {
  id: string;
  textEn: string;
  textHi: string;
  authorEn?: string;
  authorHi?: string;
  updatedAt: string;
}
