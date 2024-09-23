export interface Commit {
  id: number;
  repo: string;
  branch: string;
  changeset: string;
  created: string;
  created_at: string; // Absolute timestamp
  message: string;
  user: {
    name: string;
    avatar: string;
  };
  likes?: number | null;
  dislikes?: number | null;
}
export interface CommitItemProps {
    commit: Commit;
    isExpanded: boolean;
    toggleExpand: () => void;
  }
  