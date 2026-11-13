import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  increment,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  doc,
  getDocFromServer,
  type Timestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection(): Promise<void> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

export interface WeddingWish {
  id?: string;
  name: string;
  relation: string;
  text: string;
  avatar: string;
  likes: number;
  time: string;
}

export interface QuizReplyItem {
  id?: string;
  name: string;
  scoreText: string;
  reply: string;
  avatar: string;
  likes: number;
  time: string;
}

function formatWishTime(createdAt: unknown): string {
  if (!createdAt) return 'Just now';
  try {
    const ts = createdAt as Timestamp;
    const date = typeof ts.toDate === 'function' ? ts.toDate() : new Date(String(createdAt));
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hr ago`;
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'Blessed with love';
  }
}

export function subscribeToWishes(
  onUpdate: (wishes: WeddingWish[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  const path = 'wishes';
  const q = query(collection(db, path), orderBy('createdAt', 'desc'), limit(100));

  return onSnapshot(
    q,
    (snapshot) => {
      const wishes: WeddingWish[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        const name = typeof data.name === 'string' ? data.name : 'Well-wisher';
        return {
          id: docSnap.id,
          name,
          relation: typeof data.relation === 'string' ? data.relation : 'Well-wisher',
          text: typeof data.text === 'string' ? data.text : '',
          avatar:
            typeof data.avatar === 'string' && data.avatar.length > 0
              ? data.avatar
              : name.charAt(0).toUpperCase(),
          likes: typeof data.likes === 'number' && Number.isFinite(data.likes) ? data.likes : 0,
          time: formatWishTime(data.createdAt),
        };
      });
      onUpdate(wishes);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, path);
      } catch (wrapped) {
        if (onError && wrapped instanceof Error) {
          onError(wrapped);
        }
      }
    }
  );
}

export async function submitWishToFirebase(input: {
  name: string;
  relation: string;
  text: string;
}): Promise<void> {
  const path = 'wishes';
  const cleanName = input.name.trim().slice(0, 80);
  const cleanRelation = (input.relation.trim() || 'Well-wisher').slice(0, 50);
  const cleanText = input.text.trim().slice(0, 500);
  const avatar = (cleanName.charAt(0) || '❤').toUpperCase().slice(0, 4);

  if (!cleanName || !cleanText) {
    throw new Error('Name and wish message are required.');
  }

  try {
    await addDoc(collection(db, path), {
      name: cleanName,
      relation: cleanRelation,
      text: cleanText,
      avatar,
      likes: 0,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function likeWishInFirebase(wishId: string): Promise<void> {
  const path = `wishes/${wishId}`;
  try {
    await updateDoc(doc(db, 'wishes', wishId), {
      likes: increment(1),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export function subscribeToQuizReplies(
  onUpdate: (replies: QuizReplyItem[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  const path = 'quiz_replies';
  const q = query(collection(db, path), orderBy('createdAt', 'desc'), limit(100));

  return onSnapshot(
    q,
    (snapshot) => {
      const replies: QuizReplyItem[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        const name = typeof data.name === 'string' ? data.name : 'Wedding Guest';
        return {
          id: docSnap.id,
          name,
          scoreText: typeof data.scoreText === 'string' ? data.scoreText : 'Quiz Player',
          reply: typeof data.reply === 'string' ? data.reply : '',
          avatar:
            typeof data.avatar === 'string' && data.avatar.length > 0
              ? data.avatar
              : name.charAt(0).toUpperCase(),
          likes: typeof data.likes === 'number' && Number.isFinite(data.likes) ? data.likes : 0,
          time: formatWishTime(data.createdAt),
        };
      });
      onUpdate(replies);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, path);
      } catch (wrapped) {
        if (onError && wrapped instanceof Error) {
          onError(wrapped);
        }
      }
    }
  );
}

export async function submitQuizReplyToFirebase(input: {
  name: string;
  scoreText: string;
  reply: string;
}): Promise<void> {
  const path = 'quiz_replies';
  const cleanName = input.name.trim().slice(0, 80);
  const cleanScoreText = (input.scoreText.trim() || 'Quiz Star').slice(0, 40);
  const cleanReply = input.reply.trim().slice(0, 400);
  const avatar = (cleanName.charAt(0) || '💘').toUpperCase().slice(0, 4);

  if (!cleanName || !cleanReply) {
    throw new Error('Name and reply are required.');
  }

  try {
    await addDoc(collection(db, path), {
      name: cleanName,
      scoreText: cleanScoreText,
      reply: cleanReply,
      avatar,
      likes: 0,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function likeQuizReplyInFirebase(replyId: string): Promise<void> {
  const path = `quiz_replies/${replyId}`;
  try {
    await updateDoc(doc(db, 'quiz_replies', replyId), {
      likes: increment(1),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}
