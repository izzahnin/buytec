import {
  DocumentData,
  DocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

export interface AdminType {
  username: string | null;
  superAdmin: boolean | null;
}

export function jsonToAdmin(json: { [key: string]: any }): AdminType {
    return {
        username: json.username || "",
        superAdmin: json.superAdmin ?? false,
    }
}

export const adminConverter = {
  toFirestore: (user: AdminType) => {
    return {
      username: user.username,
      superAdmin: user.superAdmin,
    };
  },
  fromFirestore: (
    snapshot: DocumentSnapshot<DocumentData, DocumentData>,
    options: SnapshotOptions | undefined,
  ) => {
    const data: DocumentData | undefined = snapshot.data(options);

    return {
      username: data!.username,
      superAdmin: data?.superAdmin ?? false,
    } as AdminType;
  },
};
