import CopyButton from "./CopyButton";

export type EWallet = {
  provider: string;
  number: string;
  accountName: string;
};

export default function EWalletCard({ provider, number, accountName }: EWallet) {
  return (
    <div className="pixel-panel px-5 py-4 flex items-start gap-4">
      <span className="text-2xl shrink-0">📱</span>
      <div className="flex-1 min-w-0 space-y-2">
        <div>
          <p className="font-pixel text-[7px] text-ink/50">E-WALLET</p>
          <p className="font-body text-base">{provider}</p>
        </div>
        <div>
          <p className="font-pixel text-[7px] text-ink/50">NOMOR</p>
          <p className="font-body text-base tracking-wide">{number}</p>
        </div>
        <div>
          <p className="font-pixel text-[7px] text-ink/50">ATAS NAMA</p>
          <p className="font-body text-sm">{accountName}</p>
        </div>
      </div>
      <CopyButton
        value={number}
        label={`Copy ${provider} number`}
        successLabel="NUMBER COPIED! ✓"
      />
    </div>
  );
}
