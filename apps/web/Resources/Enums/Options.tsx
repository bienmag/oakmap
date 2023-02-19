export const READER = 'reader'
export const EDITOR = 'editor'
export const TREEMODES = [READER, EDITOR]

export enum TREE_MODE {
  Reader = 'reader',
  Editor = 'editor',
}

export enum NODE_TYPE {
  Root = 'root',
  Branch = 'branch',
  LeftLeaf = 'leftLeaf',
  RightLeaf = 'rightLeaf',
}
