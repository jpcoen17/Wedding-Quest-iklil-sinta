import { wedding } from "@/config/wedding";
import SectionHeading from "./SectionHeading";
import BankCard from "./BankCard";
import EWalletCard from "./EWalletCard";

export default function WeddingGift() {
  return (
    <section className="relative bg-sky-light py-24 px-6">
      <div className="max-w-md mx-auto">
        <SectionHeading level="ITEM SHOP" title="Wedding Gift" />
        <p className="text-center font-body text-ink/70 -mt-6 mb-8">
          {wedding.gift.intro}
        </p>

        {wedding.gift.bankAccounts.length > 0 && (
          <div className="mb-6">
            <p className="font-pixel text-[9px] text-ink/50 mb-3">
              BANK TRANSFER
            </p>
            <div className="space-y-4">
              {wedding.gift.bankAccounts.map((acc) => (
                <BankCard key={acc.accountNumber} {...acc} />
              ))}
            </div>
          </div>
        )}

        {wedding.gift.ewallets.length > 0 && (
          <div>
            <p className="font-pixel text-[9px] text-ink/50 mb-3">E-WALLET</p>
            <div className="space-y-4">
              {wedding.gift.ewallets.map((ew) => (
                <EWalletCard key={ew.number} {...ew} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
