
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, Trash2, Copy, CheckCircle, FileText } from 'lucide-react';
import { jsPDF } from 'https://esm.sh/jspdf';
import autoTable from 'https://esm.sh/jspdf-autotable';

interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
  category: string;
}

const PRODUCTS: Product[] = [
  // HINÁRIOS DE CANTO
  { id: 'hc1', code: 'HC-100', name: 'HC - capa simples - médio', price: 10.00, category: 'Hinários de Canto' },
  { id: 'hc2', code: 'HC-101-P', name: 'HC - capa dura preto - pequeno', price: 10.00, category: 'Hinários de Canto' },
  { id: 'hc3', code: 'HC-102-P', name: 'HC - capa recouro preto - pequeno', price: 14.00, category: 'Hinários de Canto' },
  { id: 'hc4', code: 'HC-103-M', name: 'HC - capa dura preto - médio', price: 15.00, category: 'Hinários de Canto' },
  { id: 'hc5', code: 'HC-105-M', name: 'HC - capa recouro preto - médio', price: 20.00, category: 'Hinários de Canto' },
  { id: 'hc106', code: 'HC-106-M', name: 'HC - capa recouro preto - médio c/ espiral', price: 22.00, category: 'Hinários de Canto' },
  { id: 'hc201', code: 'HC-201-G', name: 'HC - capa dura preto - grande', price: 25.00, category: 'Hinários de Canto' },
  { id: 'hc6', code: 'HC-205-G', name: 'HC - capa recouro preto - grande', price: 30.00, category: 'Hinários de Canto' },
  { id: 'hc7', code: 'HC-206-G', name: 'HC - capa recouro preto - grande c/ espiral', price: 32.00, category: 'Hinários de Canto' },
  { id: 'hc8', code: 'HC-441', name: 'HC - hinário infantil', price: 5.00, category: 'Hinários de Canto' },
  { id: 'hc9', code: 'HC-BV', name: 'HC - hinário de canto (baixa visão) 21x29 cm', price: 63.00, category: 'Hinários de Canto' },

  // HINÁRIOS MUSICAIS
  { id: 'hm1', code: 'HM-102', name: 'HM - médio - DÓ', price: 30.00, category: 'Hinários Musicais' },
  { id: 'hm2', code: 'HM-109', name: 'HM - médio - ÓRGÃO', price: 40.00, category: 'Hinários Musicais' },
  { id: 'hm3', code: 'HM-110', name: 'HM - médio - SI BEMOL', price: 30.00, category: 'Hinários Musicais' },
  { id: 'hm4', code: 'HM-111', name: 'HM - médio - MI BEMOL', price: 30.00, category: 'Hinários Musicais' },
  { id: 'hm5', code: 'HM-113', name: 'HM - médio - CORDAS', price: 35.00, category: 'Hinários Musicais' },
  { id: 'hm6', code: 'HM-116', name: 'HM - médio - FÁ', price: 30.00, category: 'Hinários Musicais' },
  { id: 'hm7', code: 'HM-117', name: 'HM - médio - TUBA', price: 30.00, category: 'Hinários Musicais' },
  { id: 'hm8', code: 'HM-202', name: 'HM - pequeno - DÓ', price: 20.00, category: 'Hinários Musicais' },
  { id: 'hm9', code: 'HM-209', name: 'HM - pequeno - ÓRGÃO', price: 25.00, category: 'Hinários Musicais' },
  { id: 'hm10', code: 'HM-210', name: 'HM - pequeno - SI BEMOL', price: 25.00, category: 'Hinários Musicais' },
  { id: 'hm11', code: 'HM-211', name: 'HM - pequeno - MI BEMOL', price: 25.00, category: 'Hinários Musicais' },
  { id: 'hm12', code: 'HM-213', name: 'HM - pequeno - CORDAS', price: 28.00, category: 'Hinários Musicais' },
  { id: 'hm13', code: 'HM-302', name: 'HM - grande/gigante - DÓ', price: 45.00, category: 'Hinários Musicais' },
  { id: 'hm14', code: 'HM-309', name: 'HM - grande/gigante - ÓRGÃO', price: 55.00, category: 'Hinários Musicais' },
  { id: 'hm310', code: 'HM-310', name: 'HM - grande/gigante - SI BEMOL', price: 45.00, category: 'Hinários Musicais' },
  { id: 'hm311', code: 'HM-311', name: 'HM - grande/gigante - MI BEMOL', price: 45.00, category: 'Hinários Musicais' },
  { id: 'hm15', code: 'HM-313', name: 'HM - grande/gigante - CORDAS', price: 50.00, category: 'Hinários Musicais' },
  { id: 'hm16', code: 'HM-502-P', name: 'HM - preto - mini - DÓ', price: 15.00, category: 'Hinários Musicais' },

  // BÍBLIAS
  { id: 'b1', code: 'B-1', name: 'B - média - preta - capa dura percalux - índice', price: 35.00, category: 'Bíblias' },
  { id: 'b3', code: 'B-3', name: 'B - média - preta - dourada - recouro - índice', price: 40.00, category: 'Bíblias' },
  { id: 'b5', code: 'B-5', name: 'B - grande - preta - beira dourada - recouro - índice', price: 85.00, category: 'Bíblias' },
  { id: 'b5L', code: 'B-5L', name: 'B - grande - preta - púlpito - beira dourada - índice', price: 100.00, category: 'Bíblias' },
  { id: 'b6', code: 'B-6', name: 'B - mini - preta - beira dourada - índice', price: 22.00, category: 'Bíblias' },
  { id: 'b8', code: 'B-8', name: 'B - média - preta - letras grandes - dic. conc. - índice', price: 60.00, category: 'Bíblias' },
  { id: 'b9', code: 'B-9', name: 'B - pequena - preta - beira dourada - recouro - índice', price: 25.00, category: 'Bíblias' },
  { id: 'b14', code: 'B-14', name: 'B - média - preta - dic. conc. - recouro - índice', price: 50.00, category: 'Bíblias' },
  { id: 'b15', code: 'B-15', name: 'B - média - papel laminado - capa mole', price: 25.00, category: 'Bíblias' },
  { id: 'b16', code: 'B-16', name: 'B - c/ HINÁRIO - média - preta - recouro - índice', price: 50.00, category: 'Bíblias' },
  { id: 'b17', code: 'B-17', name: 'B - c/ HINÁRIO - pequena - preta - recouro - índice', price: 40.00, category: 'Bíblias' },
  { id: 'b18', code: 'B-18', name: 'B - c/ HINÁRIO - letras grandes - dic/conc./índice', price: 65.00, category: 'Bíblias' },
  { id: 'b19', code: 'B-19', name: 'B - c/ HINÁRIO - letras grandes', price: 60.00, category: 'Bíblias' },
  { id: 'b20', code: 'B-20', name: 'B - c/ HINÁRIO - letras gigante - recouro - índice', price: 80.00, category: 'Bíblias' },
  { id: 'b21', code: 'B-21', name: 'B - c/ HINÁRIO MUSICAL - média - preta - recouro', price: 35.00, category: 'Bíblias' },
  { id: 'b22', code: 'B-22', name: 'B - c/ HINÁRIO MUSICAL - pequena - preta - recouro', price: 40.00, category: 'Bíblias' },

  // BÍBLIAS COM ZÍPER
  { id: 'bz2', code: 'BZ-2', name: 'BZ - pequena - recouro - índice', price: 35.00, category: 'Bíblias com Zíper' },
  { id: 'bz3', code: 'BZ-3', name: 'BZ - grande - recouro - índice', price: 50.00, category: 'Bíblias com Zíper' },
  { id: 'bz17', code: 'BZ-17', name: 'BZ c/ HINÁRIO - pequena - recouro - índice', price: 45.00, category: 'Bíblias com Zíper' },
  { id: 'bz16', code: 'BZ-16', name: 'BZ c/ HINÁRIO - grande - recouro - índice', price: 55.00, category: 'Bíblias com Zíper' },

  // VÉUS
  { id: 'vaA', code: 'VA-A', name: 'Véu de algodão - para adulto', price: 12.00, category: 'Véus' },
  { id: 'vaC', code: 'VA-C', name: 'Véu de algodão - para criança', price: 10.00, category: 'Véus' },
  { id: 'vbA', code: 'VB-A', name: 'Véu c/ bolsa - adulto', price: 25.00, category: 'Véus' },
  { id: 'vbC', code: 'VB-C', name: 'Véu c/ bolsa - criança', price: 20.00, category: 'Véus' },
  { id: 'vrA', code: 'VR-A', name: 'Véu Redondo de algodão - para adulto', price: 25.00, category: 'Véus' },

  // DIVERSOS
  { id: 'msa', code: 'MSA', name: 'Manual de Aprendizado Simplificado', price: 10.00, category: 'Diversos' },
  { id: 'min', code: 'MIN', name: 'Manual p/ Instrutora', price: 5.00, category: 'Diversos' },
  { id: 'mor1', code: 'MOR-V1', name: 'Estudo p/ Órgão Eletrônico - VOL. 1', price: 8.00, category: 'Diversos' },
  { id: 'mor2', code: 'MOR-V2', name: 'Estudo p/ Órgão Eletrônico - VOL. 2', price: 8.00, category: 'Diversos' },
  { id: 'mor3', code: 'MOR-V3', name: 'Estudo p/ Órgão Eletrônico - VOL. 3', price: 8.00, category: 'Diversos' },
  { id: 'mor4', code: 'MOR-V4', name: 'Estudo p/ Órgão Eletrônico - VOL. 4', price: 8.00, category: 'Diversos' },
  { id: 'dic01', code: 'DIC-01', name: 'Dicionário Bíblico TYNDALE', price: 120.00, category: 'Diversos' },
  { id: 'div02', code: 'DIV-02', name: 'Histórico dos Hinos', price: 15.00, category: 'Diversos' },
  { id: 'div03', code: 'DIV-03', name: 'Instrução para a Organista', price: 3.00, category: 'Diversos' },
  { id: 'div04', code: 'DIV-04', name: 'Guia de Estudo Bíblico', price: 12.00, category: 'Diversos' },

  // ITENS EXTERIOR
  { id: 'ext1', code: 'B-PORT/ING', name: 'B-PORTUGUÊS/INGLÊS - luxo - média - preta', price: 80.00, category: 'Itens Exterior' },
  { id: 'ext2', code: 'B-1FR', name: 'B-FRANCÊS - média - modelo básico', price: 30.00, category: 'Itens Exterior' },
  { id: 'ext3', code: 'B-3ING', name: 'B-INGLÊS - luxo - média - preta', price: 80.00, category: 'Itens Exterior' },
  { id: 'ext4', code: 'B-3E', name: 'B-ESPANHOL - luxo - média - preta', price: 40.00, category: 'Itens Exterior' },
  { id: 'ext5', code: 'B-7ITA', name: 'B-ITALIANA - recouro preto - grande', price: 80.00, category: 'Itens Exterior' },
  { id: 'ext6', code: 'HC-10105', name: 'HC ESPANHOL - capa recouro preto - grande', price: 25.00, category: 'Itens Exterior' },
  { id: 'ext7', code: 'HC-11105', name: 'HC INGLÊS - capa recouro preto - grande', price: 30.00, category: 'Itens Exterior' },
  { id: 'ext8', code: 'HC-11115', name: 'HC ING/PORT - capa recouro preto - grande', price: 35.00, category: 'Itens Exterior' },
  { id: 'ext9', code: 'HC-12105', name: 'HC FRANCÊS - capa recouro preto - grande', price: 30.00, category: 'Itens Exterior' },
  { id: 'ext10', code: 'HC-13105', name: 'HC ITALIANO - capa recouro preto - grande', price: 45.00, category: 'Itens Exterior' },
  { id: 'ext11', code: 'HC-19105', name: 'HC ALEMÃO - capa recouro preto - grande', price: 20.00, category: 'Itens Exterior' },
  { id: 'ext12', code: 'HM-11102', name: 'HM INGLÊS - Hinário Musical - médio - DÓ', price: 25.00, category: 'Itens Exterior' },
  { id: 'ext13', code: 'HM-11109', name: 'HM INGLÊS - Hinário Musical - médio - ÓRGÃO', price: 50.00, category: 'Itens Exterior' },
  { id: 'ext14', code: 'HM-11113', name: 'HM INGLÊS - Hinário Musical - médio - CORDAS', price: 40.00, category: 'Itens Exterior' },

  // MANUTENÇÃO (DEPÓSITO SEPARADO)
  { id: 'm1', code: 'C-18', name: 'Pedidos de Oração - PACOTE C/ 25 BLOCOS', price: 20.00, category: 'Manutenção' },
  { id: 'm2', code: 'C-19', name: 'Recitativos - PACOTE C/ 25 BLOCOS', price: 12.50, category: 'Manutenção' },
  { id: 'm3', code: 'C-41', name: 'Envelope para Coletas (Grande) - c/250 unid.', price: 25.00, category: 'Manutenção' },
  { id: 'm4', code: 'C-42', name: 'Envelope para Coletas (Pequeno) - c/250 unid.', price: 20.00, category: 'Manutenção' },
  { id: 'm5', code: 'C-50', name: 'Relatório Mensal de Coletas - Bloco', price: 15.00, category: 'Manutenção' },
];

const CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))];

const App = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);

  const handleQuantityChange = (id: string, value: string) => {
    const numValue = parseInt(value, 10);
    setQuantities(prev => ({
      ...prev,
      [id]: isNaN(numValue) || numValue < 0 ? 0 : numValue
    }));
  };

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const clearAll = () => {
    if (confirm('Deseja limpar todo o pedido?')) {
      setQuantities({});
    }
  };

  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = Object.entries(quantities).reduce((acc, [id, qty]) => {
    const product = PRODUCTS.find(p => p.id === id);
    return acc + (product ? product.price * qty : 0);
  }, 0);

  const maintenanceTotal = Object.entries(quantities).reduce((acc, [id, qty]) => {
    const product = PRODUCTS.find(p => p.id === id);
    return product?.category === 'Manutenção' ? acc + (product.price * qty) : acc;
  }, 0);

  const biblicalTotal = totalAmount - maintenanceTotal;

  const copyOrder = () => {
    const selectedItems = PRODUCTS.filter(p => (quantities[p.id] || 0) > 0);
    if (selectedItems.length === 0) return;

    let text = `*PEDIDO DA DISTRIBUIDORA*\n\n`;
    selectedItems.forEach(p => {
      text += `• ${quantities[p.id]}x ${p.code} - ${p.name}: R$ ${(p.price * quantities[p.id]).toFixed(2)}\n`;
    });
    text += `\n--- TOTALIZADORES ---\n`;
    text += `Fundo Bíblico: R$ ${biblicalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
    text += `Manutenção: R$ ${maintenanceTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
    text += `*TOTAL GERAL: R$ ${totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}*`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generatePDF = () => {
    const selectedItems = PRODUCTS.filter(p => (quantities[p.id] || 0) > 0);
    if (selectedItems.length === 0) return;

    const doc = new jsPDF();
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');

    // Header
    doc.setFontSize(18);
    doc.setTextColor(0, 51, 102);
    doc.text('PEDIDO DA DISTRIBUIDORA', 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Data: ${dateStr}`, 14, 28);

    const tableData = selectedItems.map(p => [
      p.code,
      p.name,
      quantities[p.id],
      `R$ ${p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      `R$ ${(p.price * quantities[p.id]).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
    ]);

    autoTable(doc, {
      startY: 35,
      head: [['Código', 'Descrição', 'Quant.', 'Preço Unit.', 'Subtotal']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] },
      styles: { fontSize: 9 },
      columnStyles: {
        0: { cellWidth: 25 },
        2: { halign: 'center', cellWidth: 15 },
        3: { halign: 'right', cellWidth: 30 },
        4: { halign: 'right', cellWidth: 30 }
      }
    });

    const finalY = (doc as any).lastAutoTable.finalY || 150;

    // Totals Section
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(`Fundo Bíblico: R$ ${biblicalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 140, finalY + 15, { align: 'left' });
    doc.text(`Manutenção: R$ ${maintenanceTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 140, finalY + 22, { align: 'left' });
    
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text(`TOTAL GERAL: R$ ${totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 140, finalY + 32, { align: 'left' });

    doc.save(`Pedido_Distribuidora_${dateStr.replace(/\//g, '-')}.pdf`);
  };

  return (
    <div className="min-h-screen pb-48 bg-slate-50">
      {/* Header */}
      <header className="header-gradient text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-3xl font-bold tracking-tight">PEDIDO DA DISTRIBUIDORA</h1>
              <p className="text-blue-100 text-xs md:text-sm opacity-90">Tabela de Preços e Gestão de Pedidos</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Pesquisar código ou nome..."
                className="pl-10 pr-4 py-2 bg-blue-900/40 border border-blue-400/30 rounded-full text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-64 transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-6 md:mt-8 space-y-6 md:space-y-8">
        {CATEGORIES.map(category => {
          const productsInCategory = filteredProducts.filter(p => p.category === category);
          if (productsInCategory.length === 0) return null;

          return (
            <section key={category} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <h2 className="font-bold text-slate-800 uppercase tracking-wider text-xs md:text-sm">{category}</h2>
                <span className="text-[10px] md:text-xs text-slate-500 font-medium">{productsInCategory.length} itens</span>
              </div>
              <div className="divide-y divide-slate-100">
                {productsInCategory.map(product => (
                  <div key={product.id} className="p-3 md:p-4 flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 hover:bg-slate-50/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] md:text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{product.code}</span>
                        <span className="text-xs md:text-sm font-semibold text-slate-900">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <h3 className="text-slate-600 text-xs md:text-sm leading-tight">{product.name}</h3>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end gap-3 md:gap-6">
                      <div className="flex items-center bg-slate-100 rounded-lg p-0.5 md:p-1 border border-slate-200">
                        <button 
                          onClick={() => updateQuantity(product.id, -1)}
                          className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-white rounded-md text-slate-600 active:scale-90 transition-all font-bold"
                        >
                          -
                        </button>
                        <input 
                          type="number"
                          className="w-10 md:w-12 text-center bg-transparent border-none focus:ring-0 font-bold text-slate-800 text-xs md:text-sm"
                          value={quantities[product.id] || ''}
                          onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                          placeholder="0"
                        />
                        <button 
                          onClick={() => updateQuantity(product.id, 1)}
                          className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-white rounded-md text-slate-600 active:scale-90 transition-all font-bold"
                        >
                          +
                        </button>
                      </div>
                      <div className="w-20 md:w-24 text-right">
                        <p className="text-[9px] md:text-[10px] text-slate-400 uppercase font-bold mb-0.5">Subtotal</p>
                        <p className="font-bold text-blue-600 text-sm md:text-base">
                          R$ {((quantities[product.id] || 0) * product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* Footer Totalizer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-8px_30px_rgb(0,0,0,0.08)] z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-8">
              <div className="bg-slate-50 p-2 md:p-0 rounded-lg md:bg-transparent">
                <p className="text-[9px] md:text-xs text-slate-400 uppercase font-bold tracking-wider mb-0.5 md:mb-1">Fundo Bíblico</p>
                <p className="text-xs md:text-lg font-bold text-slate-700">R$ {biblicalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-slate-50 p-2 md:p-0 rounded-lg md:bg-transparent">
                <p className="text-[9px] md:text-xs text-slate-400 uppercase font-bold tracking-wider mb-0.5 md:mb-1">Manutenção</p>
                <p className="text-xs md:text-lg font-bold text-slate-700">R$ {maintenanceTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l border-slate-100 pt-2 md:pt-0 md:pl-8 flex flex-col justify-center">
                <p className="text-[9px] md:text-xs text-slate-400 uppercase font-bold tracking-wider mb-0.5 md:mb-1">Total Geral</p>
                <p className="text-lg md:text-2xl font-extrabold text-blue-600">R$ {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <button 
                onClick={clearAll}
                className="flex items-center justify-center gap-2 px-3 md:px-4 py-2.5 md:py-3 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all font-semibold text-xs md:text-sm border border-slate-200"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Limpar</span>
              </button>
              
              <button 
                onClick={generatePDF}
                disabled={totalAmount === 0}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-bold transition-all shadow-md active:scale-95 text-xs md:text-sm border ${
                  totalAmount > 0 
                  ? 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'
                  : 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                }`}
              >
                <FileText className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Gerar PDF</span>
                <span className="sm:hidden">PDF</span>
              </button>

              <button 
                onClick={copyOrder}
                disabled={totalAmount === 0}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-bold transition-all shadow-md active:scale-95 text-xs md:text-sm ${
                  totalAmount > 0 
                  ? (copied ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700')
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">Copiar Pedido</span>
                    <span className="sm:hidden">Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
