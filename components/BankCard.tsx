import CopyButton from "./CopyButton";

export type BankAccount = {
  bank: string;
  accountNumber: string;
  accountName: string;
};

export default function BankCard({ bank, accountNumber, accountName }: BankAccount) {
  return (
    <div className="pixel-panel px-5 py-4 flex items-start gap-4">
      <span className="text-2xl shrink-0">🏦</span>
      <div className="flex-1 min-w-0 space-y-2">
        <div>
          <p className="font-pixel text-[7px] text-ink/50">BANK</p>
          <p className="font-body text-base">{bank}</p>
        </div>
        <div>
          <p className="font-pixel text-[7px] text-ink/50">NO. REKENING</p>
          <p className="font-body text-base tracking-wide">{accountNumber}</p>
        </div>
        <div>
          <p className="font-pixel text-[7px] text-ink/50">ATAS NAMA</p>
          <p className="font-body text-sm">{accountName}</p>
        </div>
      </div>
      <CopyButton
        value={accountNumber}
        label={`Copy ${bank} account number`}
        successLabel="ACCOUNT COPIED! ✓"
      />
    </div>
  );
}
