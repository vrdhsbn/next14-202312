// digitで指定した桁数のランダム文字列（簡易的）を生成する
export const generateRandomStrings = (digit: number) => {
  const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return [...Array<number>(digit)]
    .map(() => S[Math.floor(Math.random() * S.length)])
    .join('')
}
