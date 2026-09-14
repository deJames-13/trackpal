import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  CheckCircle2, 
  Building2, 
  Smartphone, 
  ArrowRight
} from 'lucide-react';
import { PaluwaganGroup } from '../../types';

interface ContributionModalProps {
  isOpen: boolean;
  group: PaluwaganGroup | null;
  onClose: () => void;
  onSubmitSuccess: (groupId: string, method: string, refNumber: string) => void;
  darkMode: boolean;
}

export const ContributionModal: React.FC<ContributionModalProps> = ({
  isOpen,
  group,
  onClose,
  onSubmitSuccess,
  darkMode,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'GCash' | 'Maya' | 'BPI Online' | 'BDO Bank'>('GCash');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [uploadedReceipt, setUploadedReceipt] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen || !group) return null;

  const paymentMethods = [
    { id: 'GCash', name: 'GCash', icon: Smartphone, account: '0917 555 8921 (Maria Santos)' },
    { id: 'Maya', name: 'Maya Wallet', icon: Smartphone, account: '0917 555 8921 (Maria Santos)' },
    { id: 'BPI Online', name: 'BPI Online', icon: Building2, account: 'Acct # 4410-9281-99 (TrackPal)' },
    { id: 'BDO Bank', name: 'BDO Unibank', icon: Building2, account: 'Acct # 0019-3829-11 (TrackPal)' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedReceipt(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);

      setTimeout(() => {
        onSubmitSuccess(
          group.id,
          selectedMethod,
          referenceNumber || `REF-${Math.floor(10000000 + Math.random() * 90000000)}`
        );
        setShowSuccess(false);
        onClose();
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="contribution-modal-card"
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="px-6 pt-6 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-[#F5B800] text-neutral-950">
              Hulog Submission • Round #{group.currentRound}
            </span>
          </div>
          <h2 className="text-2xl font-black text-neutral-950 dark:text-white tracking-tight mt-2">
            Submit Contribution
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            {group.name} • Due amount: <strong className="text-neutral-950 dark:text-white font-bold">₱{group.contributionAmount.toLocaleString()}</strong>
          </p>
        </div>

        {showSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#F5B800] text-neutral-950 flex items-center justify-center font-black animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-neutral-950 dark:text-white tracking-tight">
              Contribution Recorded!
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm">
              Your contribution of ₱{group.contributionAmount.toLocaleString()} has been verified and logged into the circle rotation ledger.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Amount Summary Bento Box */}
            <div className="p-4 rounded-xl bg-[#F5B800] text-neutral-950 flex items-center justify-between shadow-xs">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-900 block">Total Share Due</span>
                <span className="text-3xl font-black tracking-tight text-neutral-950">
                  ₱{group.contributionAmount.toLocaleString()}
                </span>
              </div>
              <span className="text-xs font-black px-2.5 py-1 rounded-md bg-neutral-950 text-white">
                Guaranteed Pot
              </span>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                Select Destination Payment Channel
              </label>
              <div className="grid grid-cols-2 gap-2">
                {paymentMethods.map((pm) => {
                  const isSelected = selectedMethod === pm.id;
                  const Icon = pm.icon;

                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setSelectedMethod(pm.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#F5B800] bg-[#F5B800]/10 ring-2 ring-[#F5B800]'
                          : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-850'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-neutral-950 dark:text-[#F5B800]' : 'text-neutral-400'}`} />
                        <span className="text-xs font-bold text-neutral-950 dark:text-white">
                          {pm.name}
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 truncate">
                        {pm.account}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reference Number Field */}
            <div>
              <label className="block text-xs font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                Transaction / Reference Number (From GCash / Bank)
              </label>
              <input
                id="contribution-ref-number-input"
                type="text"
                placeholder="e.g. GC-99120384 or BPI-77291032"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                className="w-full h-10 px-3 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-950 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#F5B800]"
              />
            </div>

            {/* Mock Drag & Drop File Upload */}
            <div>
              <label className="block text-xs font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                Attach Proof of Transfer (Receipt Screenshot)
              </label>
              <label
                htmlFor="receipt-upload"
                className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl hover:border-[#F5B800] bg-neutral-50 dark:bg-neutral-850 cursor-pointer transition-colors"
              >
                <UploadCloud className="w-6 h-6 text-neutral-400 mb-1" />
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  {uploadedReceipt ? uploadedReceipt : 'Drag & drop or click to attach screenshot'}
                </span>
                <span className="text-[10px] text-neutral-400 mt-0.5">
                  PNG, JPG, or PDF (up to 5MB)
                </span>
                <input
                  id="receipt-upload"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                id="contribution-confirm-btn"
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-neutral-950 bg-[#F5B800] hover:bg-[#E0A700] active:bg-[#C79200] shadow-xs transition-all cursor-pointer"
              >
                <span>{isSubmitting ? 'Verifying Slip...' : 'Confirm & Submit Hulog'}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
