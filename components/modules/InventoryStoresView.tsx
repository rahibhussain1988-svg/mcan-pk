'use client';

import React, { useState } from 'react';
import {
  Boxes,
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
  PlusCircle,
  Search,
  PackageCheck,
  CheckCircle2,
  Building,
  RotateCcw,
  TrendingDown,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import { recordStockReceipt, issueStockToDepartment } from '@/app/actions/inventory';

interface InventoryStoresViewProps {
  inventoryItems: Array<{
    id: string;
    name: string;
    sku: string;
    category: string;
    unit: string;
    currentStock: number;
    minReorderLevel: number;
    unitCost: number;
    location?: string | null;
    supplier?: string | null;
    transactions?: Array<{
      id: string;
      transactionType: string;
      quantity: number;
      unitCost: number;
      totalValue: number;
      referenceNo?: string | null;
      department?: string | null;
      createdAt: any;
    }>;
  }>;
}

export const InventoryStoresView: React.FC<InventoryStoresViewProps> = ({
  inventoryItems: initialItems,
}) => {
  const [items, setItems] = useState(initialItems);
  const [activeTab, setActiveTab] = useState<'STOCK' | 'REORDER' | 'TRANSACTIONS'>('STOCK');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Modals
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [selectedItemForAction, setSelectedItemForAction] = useState<any>(null);

  // Form States
  const [receiptForm, setReceiptForm] = useState({
    itemId: initialItems[0]?.id || '',
    quantity: 100,
    unitCost: 150,
    referenceNo: `GRN-${Date.now().toString().slice(-5)}`,
    vendorName: 'Sindh Med Supplies',
    receivedBy: 'Najaf Ali (Storekeeper)',
    notes: 'Standard replenishment batch',
  });

  const [issueForm, setIssueForm] = useState({
    itemId: initialItems[0]?.id || '',
    quantity: 20,
    department: 'IMC Emergency ER',
    costCenter: 'Hospital Operations',
    issuedTo: 'Staff Nurse In-Charge',
    issuedBy: 'Najaf Ali (Storekeeper)',
    notes: 'Emergency bedside triage stock issue',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  // Calculations
  const totalStockValuation = items.reduce(
    (sum, item) => sum + item.currentStock * item.unitCost,
    0
  );
  const lowStockItems = items.filter((item) => item.currentStock <= item.minReorderLevel);

  // Filtered Items
  const filteredItems = items.filter((item) => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Handle GRN Receipt Submission
  const handleReceiptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await recordStockReceipt({
        itemId: receiptForm.itemId,
        quantity: Number(receiptForm.quantity),
        unitCost: Number(receiptForm.unitCost),
        referenceNo: receiptForm.referenceNo,
        vendorName: receiptForm.vendorName,
        receivedBy: receiptForm.receivedBy,
        notes: receiptForm.notes,
      });

      if (res.success) {
        setSuccessToast(`Stock received successfully under GRN ${receiptForm.referenceNo}!`);
        // Update local state
        setItems((prev) =>
          prev.map((i) =>
            i.id === receiptForm.itemId
              ? {
                  ...i,
                  currentStock: i.currentStock + Number(receiptForm.quantity),
                  unitCost: Number(receiptForm.unitCost),
                }
              : i
          )
        );
        setTimeout(() => {
          setIsReceiptModalOpen(false);
          setSuccessToast('');
        }, 1500);
      } else {
        alert(res.error || 'Failed to record stock receipt.');
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Stock Issue Submission
  const handleIssueSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await issueStockToDepartment({
        itemId: issueForm.itemId,
        quantity: Number(issueForm.quantity),
        department: issueForm.department,
        costCenter: issueForm.costCenter,
        issuedTo: issueForm.issuedTo,
        issuedBy: issueForm.issuedBy,
        notes: issueForm.notes,
      });

      if (res.success) {
        setSuccessToast(`Stock issued successfully to ${issueForm.department}!`);
        // Update local state
        setItems((prev) =>
          prev.map((i) =>
            i.id === issueForm.itemId
              ? {
                  ...i,
                  currentStock: Math.max(0, i.currentStock - Number(issueForm.quantity)),
                }
              : i
          )
        );
        setTimeout(() => {
          setIsIssueModalOpen(false);
          setSuccessToast('');
        }, 1500);
      } else {
        alert(res.error || 'Failed to issue stock.');
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Central Store & Logistics
            </span>
            <span className="text-xs text-slate-400 font-mono">Storekeeper Najaf Ali</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Central Stores & Medical Inventory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Consumables, clinical lab equipment, medicine requisitions, GRN receipts, and departmental issue control.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setReceiptForm((p) => ({ ...p, itemId: items[0]?.id || '' }));
              setIsReceiptModalOpen(true);
            }}
            data-testid="btn-grn-receipt"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition flex items-center gap-1.5 shadow-sm"
          >
            <ArrowDownLeft size={15} /> Receive Stock (GRN)
          </button>
          <button
            onClick={() => {
              setIssueForm((p) => ({ ...p, itemId: items[0]?.id || '' }));
              setIsIssueModalOpen(true);
            }}
            data-testid="btn-issue-dept"
            className="bg-imam-blue hover:bg-imam-navy text-white text-xs font-bold py-2.5 px-4 rounded-xl transition flex items-center gap-1.5 shadow-sm"
          >
            <ArrowUpRight size={15} /> Issue to Department
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Valuation</span>
          <div className="text-xl font-black text-slate-900 mt-1">
            PKR {totalStockValuation.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Live store inventory at cost</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Active SKUs</span>
          <div className="text-xl font-black text-slate-900 mt-1">{items.length} Items</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Registered stock lines</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-rose-500">Reorder Radar</span>
          <div className="text-xl font-black text-rose-600 mt-1">{lowStockItems.length} Low Stock</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Below minimum safe threshold</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Governance</span>
          <div className="text-xl font-black text-emerald-600 mt-1">FIFO Audited</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Full GRN & issue tracking</p>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('STOCK')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'STOCK'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Boxes size={14} /> Item Master ({items.length})
        </button>
        <button
          onClick={() => setActiveTab('REORDER')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'REORDER'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-rose-600 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle size={14} /> Reorder Radar ({lowStockItems.length})
        </button>
      </div>

      {/* ITEM MASTER TABLE */}
      {activeTab === 'STOCK' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Filter Bar */}
          <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search item name or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-imam-blue/20 w-60"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700"
              >
                <option value="ALL">All Categories</option>
                <option value="Clinical Consumable">Clinical Consumables</option>
                <option value="IV Infusion">IV Infusions</option>
                <option value="Diagnostics">Diagnostics</option>
                <option value="Lab & Stationery">Lab & Stationery</option>
              </select>
            </div>

            <span className="text-xs text-slate-500 font-semibold">
              Showing {filteredItems.length} of {items.length} items
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">SKU</th>
                  <th className="p-3.5">Item Name & Category</th>
                  <th className="p-3.5 text-center">Current Stock</th>
                  <th className="p-3.5 text-center">Safe Reorder Level</th>
                  <th className="p-3.5 text-right">Unit Cost</th>
                  <th className="p-3.5 text-right">Total Valuation</th>
                  <th className="p-3.5">Store Location</th>
                  <th className="p-3.5 text-center">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredItems.map((item) => {
                  const isLow = item.currentStock <= item.minReorderLevel;
                  const totalVal = item.currentStock * item.unitCost;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-mono font-bold text-slate-700">{item.sku}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{item.name}</div>
                        <div className="text-[11px] text-slate-400">{item.category}</div>
                      </td>
                      <td className="p-3.5 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full font-black text-xs inline-flex items-center gap-1 ${
                            isLow
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {isLow && <AlertTriangle size={11} />}
                          {item.currentStock} {item.unit}
                        </span>
                      </td>
                      <td className="p-3.5 text-center text-slate-600 font-mono">
                        {item.minReorderLevel} {item.unit}
                      </td>
                      <td className="p-3.5 text-right font-mono text-slate-700">
                        PKR {item.unitCost.toLocaleString()}
                      </td>
                      <td className="p-3.5 text-right font-mono font-bold text-slate-900">
                        PKR {totalVal.toLocaleString()}
                      </td>
                      <td className="p-3.5 text-slate-600 font-medium">{item.location || 'Central Shelf'}</td>
                      <td className="p-3.5 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => {
                              setIssueForm((p) => ({ ...p, itemId: item.id }));
                              setIsIssueModalOpen(true);
                            }}
                            className="px-2 py-1 bg-slate-100 hover:bg-imam-blue hover:text-white rounded text-[10px] font-bold transition text-slate-700"
                          >
                            Issue
                          </button>
                          <button
                            onClick={() => {
                              setReceiptForm((p) => ({ ...p, itemId: item.id, unitCost: item.unitCost }));
                              setIsReceiptModalOpen(true);
                            }}
                            className="px-2 py-1 bg-slate-100 hover:bg-emerald-600 hover:text-white rounded text-[10px] font-bold transition text-slate-700"
                          >
                            GRN
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REORDER RADAR VIEW */}
      {activeTab === 'REORDER' && (
        <div className="space-y-4">
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-rose-600" />
              <span>
                <strong>Urgent Procurement Attention:</strong> {lowStockItems.length} items have fallen below safety reorder buffers.
              </span>
            </div>
            <button
              onClick={() => window.print()}
              className="bg-rose-700 hover:bg-rose-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition flex items-center gap-1"
            >
              <Printer size={12} /> Print Purchase Requisition List
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-rose-200 p-5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-slate-700">{item.sku}</span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                      CRITICAL SHORTAGE
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{item.category}</p>

                  <div className="mt-4 p-3 bg-slate-50 rounded-lg flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px]">CURRENT</span>
                      <strong className="text-rose-600 text-sm">
                        {item.currentStock} {item.unit}
                      </strong>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px]">THRESHOLD</span>
                      <strong className="text-slate-800 text-sm">
                        {item.minReorderLevel} {item.unit}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Est. PO: <strong>PKR {(item.minReorderLevel * 2 * item.unitCost).toLocaleString()}</strong>
                  </span>
                  <button
                    onClick={() => {
                      setReceiptForm((p) => ({
                        ...p,
                        itemId: item.id,
                        unitCost: item.unitCost,
                        quantity: item.minReorderLevel * 2,
                      }));
                      setIsReceiptModalOpen(true);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition"
                  >
                    Receive GRN
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: RECORD STOCK RECEIPT (GRN) */}
      {isReceiptModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <ArrowDownLeft className="text-emerald-600" size={18} /> Goods Receipt Note (GRN)
              </h3>
              <button
                onClick={() => setIsReceiptModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {successToast && (
              <div className="my-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 size={16} /> {successToast}
              </div>
            )}

            <form onSubmit={handleReceiptSubmit} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Select Consumable / Item</label>
                <select
                  value={receiptForm.itemId}
                  onChange={(e) => setReceiptForm({ ...receiptForm, itemId: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2.5 bg-white font-medium"
                  required
                >
                  {items.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name} ({i.sku}) — Current: {i.currentStock} {i.unit}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Quantity Received</label>
                  <input
                    type="number"
                    min="1"
                    value={receiptForm.quantity}
                    onChange={(e) => setReceiptForm({ ...receiptForm, quantity: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Unit Cost (PKR)</label>
                  <input
                    type="number"
                    min="1"
                    value={receiptForm.unitCost}
                    onChange={(e) => setReceiptForm({ ...receiptForm, unitCost: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 font-mono font-bold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">GRN / Delivery Challan No</label>
                  <input
                    type="text"
                    value={receiptForm.referenceNo}
                    onChange={(e) => setReceiptForm({ ...receiptForm, referenceNo: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Supplier / Vendor</label>
                  <input
                    type="text"
                    value={receiptForm.vendorName}
                    onChange={(e) => setReceiptForm({ ...receiptForm, vendorName: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Storekeeper / Received By</label>
                <input
                  type="text"
                  value={receiptForm.receivedBy}
                  onChange={(e) => setReceiptForm({ ...receiptForm, receivedBy: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2.5 font-medium"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="font-extrabold text-slate-800 text-xs">
                  Total GRN Value: PKR {(receiptForm.quantity * receiptForm.unitCost).toLocaleString()}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsReceiptModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow-sm"
                  >
                    {isSubmitting ? 'Posting...' : 'Confirm Receipt'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ISSUE TO DEPARTMENT */}
      {isIssueModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <ArrowUpRight className="text-imam-blue" size={18} /> Issue Stock to Department
              </h3>
              <button
                onClick={() => setIsIssueModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {successToast && (
              <div className="my-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 size={16} /> {successToast}
              </div>
            )}

            <form onSubmit={handleIssueSubmit} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Select Consumable</label>
                <select
                  value={issueForm.itemId}
                  onChange={(e) => setIssueForm({ ...issueForm, itemId: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2.5 bg-white font-medium"
                  required
                >
                  {items.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name} ({i.sku}) — Available: {i.currentStock} {i.unit}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Quantity to Issue</label>
                  <input
                    type="number"
                    min="1"
                    value={issueForm.quantity}
                    onChange={(e) => setIssueForm({ ...issueForm, quantity: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Department</label>
                  <select
                    value={issueForm.department}
                    onChange={(e) => setIssueForm({ ...issueForm, department: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-white font-medium"
                    required
                  >
                    <option value="IMC Emergency ER">IMC Emergency ER</option>
                    <option value="Skills & Anatomy Lab">Skills & Anatomy Lab</option>
                    <option value="ICU & High Dependency">ICU & High Dependency</option>
                    <option value="Male Surgical Ward">Male Surgical Ward</option>
                    <option value="Female Medical Ward">Female Medical Ward</option>
                    <option value="Central Administration">Central Administration</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Receiving In-Charge</label>
                  <input
                    type="text"
                    value={issueForm.issuedTo}
                    onChange={(e) => setIssueForm({ ...issueForm, issuedTo: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Cost Center</label>
                  <input
                    type="text"
                    value={issueForm.costCenter}
                    onChange={(e) => setIssueForm({ ...issueForm, costCenter: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsIssueModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-imam-blue hover:bg-imam-navy text-white font-bold rounded-xl transition shadow-sm"
                >
                  {isSubmitting ? 'Posting...' : 'Approve & Issue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
