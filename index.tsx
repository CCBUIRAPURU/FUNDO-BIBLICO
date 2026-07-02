import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, Trash2, Copy, CheckCircle, FileText, ChevronRight } from 'lucide-react';
import { jsPDF } from 'https://esm.sh/jspdf';
import autoTable from 'https://esm.sh/jspdf-autotable';

interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
  category: string;
  isManutencao?: boolean;
}

const PRODUCTS: Product[] = [
  // HINÁRIOS DE CANTO
  { id: 'hc_bv', code: 'HC-BV', name: 'HC - hinário de canto (baixa visão) 21x29 cm', price: 81.00, category: 'Hinários de Canto' },
  { id: 'hc_100', code: 'HC-100', name: 'HC - capa simples - médio - Letra Maiúscula', price: 12.00, category: 'Hinários de Canto' },
  { id: 'hc_101p', code: 'HC-101-P', name: 'HC - capa dura preto - pequeno', price: 10.00, category: 'Hinários de Canto' },
  { id: 'hc_102p', code: 'HC-102-P', name: 'HC - capa recurso preto - pequeno', price: 14.00, category: 'Hinários de Canto' },
  { id: 'hc_102b', code: 'HC-102B', name: 'Hin.Canto, capa recouro branco, pequeno', price: 15.00, category: 'Hinários de Canto' },
  { id: 'hc_103p', code: 'HC-103-P', name: 'HC - capa dura preto - médio', price: 15.00, category: 'Hinários de Canto' },
  { id: 'hc_105p', code: 'HC-105-P', name: 'HC - capa recurso preto - médio', price: 20.00, category: 'Hinários de Canto' },
  { id: 'hc_200', code: 'HC-200', name: 'HC - capa dura - médio c/ espiral - Letra Maiúscula', price: 30.00, category: 'Hinários de Canto' },
  { id: 'hc_205', code: 'HC-205', name: 'HC - capa recurso preto - grande', price: 30.00, category: 'Hinários de Canto' },
  { id: 'hc_206', code: 'HC-206', name: 'HC - capa recurso preto - grande c/espiral', price: 30.00, category: 'Hinários de Canto' },
  { id: 'hc_441', code: 'HC-441', name: 'HC - hinário infantil', price: 5.00, category: 'Hinários de Canto' },

  // HINÁRIOS DE CANTO EM OUTROS IDIOMAS
  { id: 'hc10_102', code: 'HC10-102', name: 'Hinário de canto pequeno, Capa xildec - ESPANHOL', price: 25.00, category: 'Hinários (Outros Idiomas)' },
  { id: 'hc10_103', code: 'HC10-103', name: 'Hinário de canto grande, Capa dura - ESPANHOL', price: 15.00, category: 'Hinários (Outros Idiomas)' },
  { id: 'hc10_105', code: 'HC-10105', name: 'HC ESPANHOL - capa recurso preto - grande', price: 25.00, category: 'Hinários (Outros Idiomas)' },
  { id: 'hc11_103', code: 'HC11-103', name: 'Hinário de canto grande, Capa dura - INGLÊS', price: 18.00, category: 'Hinários (Outros Idiomas)' },
  { id: 'hc11_105', code: 'HC-11105', name: 'HC INGLÊS - capa recurso preto - grande', price: 30.00, category: 'Hinários (Outros Idiomas)' },
  { id: 'hc11_112', code: 'HC11-112', name: 'Hinário de canto pequeno - INGLÊS / PORTUGUÊS', price: 25.00, category: 'Hinários (Outros Idiomas)' },
  { id: 'hc11_115', code: 'HC-11115', name: 'HC ING/PORT - capa recurso preto - grande', price: 35.00, category: 'Hinários (Outros Idiomas)' },
  { id: 'hc12_102', code: 'HC12-102', name: 'Hinário de canto grande, Capa dura - FRANCÊS', price: 20.00, category: 'Hinários (Outros Idiomas)' },
  { id: 'hc12_103', code: 'HC12-103', name: 'Hinário de canto pequeno, Capa xildec - FRANCÊS', price: 18.00, category: 'Hinários (Outros Idiomas)' },
  { id: 'hc12_105', code: 'HC-12105', name: 'HC FRANCÊS - capa recurso preto - grande', price: 30.00, category: 'Hinários (Outros Idiomas)' },
  { id: 'hc13_102', code: 'HC13-102', name: 'Hinário de canto pequeno - ITALIANO', price: 35.00, category: 'Hinários (Outros Idiomas)' },
  { id: 'hc13_105', code: 'HC-13105', name: 'HC ITALIANO - capa recurso preto - grande', price: 45.00, category: 'Hinários (Outros Idiomas)' },
  { id: 'hc14_105', code: 'HC14-105', name: 'Hin.canto grande-JAPONÊS HIRAGANÁ / KANJI', price: 30.00, category: 'Hinários (Outros Idiomas)' },
  { id: 'hc14_115', code: 'HC14-115', name: 'Hin.canto grande-JAPONÊS HIRAGANÁ / KANJI & ROMAJI', price: 40.00, category: 'Hinários (Outros Idiomas)' },
  { id: 'hc15_103', code: 'HC15-103', name: 'Hinário de canto grande - UCRÂNIANO', price: 25.00, category: 'Hinários (Outros Idiomas)' },
  { id: 'hc17_105', code: 'HC17-105', name: 'Hinário de canto grande - GREGO', price: 38.00, category: 'Hinários (Outros Idiomas)' },
  { id: 'hc19_105', code: 'HC-19105', name: 'HC ALEMÃO - capa recurso preto - grande', price: 35.00, category: 'Hinários (Outros Idiomas)' },

  // HINÁRIOS MUSICAIS
  { id: 'hm_102', code: 'HM-102', name: 'HM - médio - DÓ', price: 33.00, category: 'Hinários Musicais' },
  { id: 'hm_109', code: 'HM-109', name: 'HM - médio - ORGÃO', price: 53.00, category: 'Hinários Musicais' },
  { id: 'hm_110', code: 'HM-110', name: 'HM - médio - SI BEMOL', price: 35.00, category: 'Hinários Musicais' },
  { id: 'hm_111', code: 'HM-111', name: 'HM - médio - MI BEMOL', price: 38.00, category: 'Hinários Musicais' },
  { id: 'hm_113', code: 'HM-113', name: 'HM - médio - CORDAS', price: 36.00, category: 'Hinários Musicais' },
  { id: 'hm_116', code: 'HM-116', name: 'HM - médio - FÁ', price: 54.00, category: 'Hinários Musicais' },
  { id: 'hm_117', code: 'HM-117', name: 'HM - médio - TUBA', price: 32.00, category: 'Hinários Musicais' },
  { id: 'hm_202', code: 'HM-202', name: 'HM - pequeno - DÓ', price: 26.00, category: 'Hinários Musicais' },
  { id: 'hm_209', code: 'HM-209', name: 'HM - pequeno - ORGÃO', price: 28.00, category: 'Hinários Musicais' },
  { id: 'hm_210', code: 'HM-210', name: 'HM - pequeno - SI BEMOL', price: 27.00, category: 'Hinários Musicais' },
  { id: 'hm_211', code: 'HM-211', name: 'HM - pequeno - MI BEMOL', price: 25.00, category: 'Hinários Musicais' },
  { id: 'hm_213', code: 'HM-213', name: 'HM - pequeno - CORDAS', price: 34.00, category: 'Hinários Musicais' },
  { id: 'hm_302', code: 'HM-302', name: 'HM - grande - DÓ', price: 45.00, category: 'Hinários Musicais' },
  { id: 'hm_309', code: 'HM-309', name: 'HM - grande - ORGÃO', price: 74.00, category: 'Hinários Musicais' },
  { id: 'hm_313', code: 'HM-313', name: 'HM - grande - CORDAS', price: 83.00, category: 'Hinários Musicais' },
  { id: 'hm_409', code: 'HM-409', name: 'Hinário de música, gigante – ORGÃO', price: 207.00, category: 'Hinários Musicais' },
  { id: 'hm_414', code: 'HM-414', name: 'Hin.música, gigante – Clave de SOL - Def. Visual', price: 60.00, category: 'Hinários Musicais' },
  { id: 'hm_415', code: 'HM-415', name: 'Hin.música, gigante – Clave de FÁ - Deficiente Visual', price: 60.00, category: 'Hinários Musicais' },
  { id: 'hm_502p', code: 'HM-502-P', name: 'HM - preto - mini - DÓ', price: 17.00, category: 'Hinários Musicais' },
  { id: 'hm_11102', code: 'HM-11102', name: 'HM INGLÊS - Hinário Musical - médio - DÓ', price: 25.00, category: 'Hinários Musicais' },
  { id: 'hm_11109', code: 'HM-11109', name: 'HM INGLÊS - Hinário Musical - médio - ÓRGÃO', price: 54.00, category: 'Hinários Musicais' },
  { id: 'hm_11113', code: 'HM-11113', name: 'HM INGLÊS - Hinário Musical - médio - CORDAS', price: 40.00, category: 'Hinários Musicais' },

  // BÍBLIAS SEM ZÍPER
  { id: 'b_1', code: 'B-1', name: 'B - média - preta - recurso', price: 35.00, category: 'Bíblias' },
  { id: 'b_3', code: 'B-3', name: 'B - média - preta - dourada - recurso', price: 40.00, category: 'Bíblias' },
  { id: 'b_5l', code: 'B-5L', name: 'B - gigante - preta - púlpito - dourada - recurso', price: 119.00, category: 'Bíblias' },
  { id: 'b_6', code: 'B-6', name: 'B - mini - preta - dourada - recurso', price: 25.00, category: 'Bíblias' },
  { id: 'b_7', code: 'B-7', name: 'B - média - preta - dourada - recurso', price: 38.00, category: 'Bíblias' },
  { id: 'b_8', code: 'B-8', name: 'B - grande - preta - letras gr. (dic./conc.) - recurso', price: 60.00, category: 'Bíblias' },
  { id: 'b_9', code: 'B-9', name: 'B - pequena - preta - dourada - recurso', price: 27.00, category: 'Bíblias' },
  { id: 'b_14', code: 'B-14', name: 'B - média - preta - (dic./conc.) - dourada - recurso', price: 50.00, category: 'Bíblias' },
  { id: 'b_15', code: 'B-15', name: 'B - média - papel laminado - capa mole', price: 25.00, category: 'Bíblias' },
  { id: 'b_16', code: 'B-16', name: 'B - c/ HINÁRIO - média - preta - dourada - recurso', price: 50.00, category: 'Bíblias' },
  { id: 'b_17', code: 'B-17', name: 'B - c/ HINÁRIO - pequena - preta - dourada - recurso', price: 40.00, category: 'Bíblias' },
  { id: 'b_18', code: 'B-18', name: 'B - c/ HINÁRIO - grande - letras gr. (dic./conc.) - rec.', price: 65.00, category: 'Bíblias' },
  { id: 'b_19', code: 'B-19', name: 'B - c/ HINÁRIO - grande letras grandes - recurso', price: 60.00, category: 'Bíblias' },
  { id: 'b_21', code: 'B-21', name: 'B - c/ HINÁRIO MUSICAL - média - preta - recurso', price: 40.00, category: 'Bíblias' },
  { id: 'b_22', code: 'B-22', name: 'B - c/ HINÁRIO MUSICAL - pequena - preta - recurso', price: 40.00, category: 'Bíblias' },
  { id: 'b_24', code: 'B-24', name: 'B - grande - letras gigantes - recurso', price: 90.00, category: 'Bíblias' },

  // BÍBLIAS COM ZÍPER
  { id: 'bz_2', code: 'BZ-2', name: 'BZ - pequena - recurso - índice', price: 35.00, category: 'Bíblias (Zíper)' },
  { id: 'bz_3', code: 'BZ-3', name: 'BZ - grande - recurso - índice', price: 50.00, category: 'Bíblias (Zíper)' },
  { id: 'bz_16', code: 'BZ-16', name: 'BZ c/ HINÁRIO - grande - recurso - índice', price: 55.00, category: 'Bíblias (Zíper)' },
  { id: 'bz_17', code: 'BZ-17', name: 'BZ c/ HINÁRIO - pequena - recurso - índice', price: 45.00, category: 'Bíblias (Zíper)' },

  // BÍBLIAS EM OUTROS IDIOMAS
  { id: 'b_port_ing', code: 'B-PORT/ING', name: 'B-PORTUGUÊS/INGLÊS - luxo - média - preta', price: 85.00, category: 'Bíblias (Outros Idiomas)' },
  { id: 'b_rv1960', code: 'B-RV1960', name: 'Bíblia Espanhol, REINA VALERA 1960, Formato 13,5x18,5cm', price: 60.00, category: 'Bíblias (Outros Idiomas)' },
  { id: 'b_1e', code: 'B-1E', name: 'Bíblia Espanhol, capa dura, Formato 13,5x18,5 cm', price: 30.00, category: 'Bíblias (Outros Idiomas)' },
  { id: 'b_3e', code: 'B-3E', name: 'B-ESPANHOL - luxo - média - preta', price: 40.00, category: 'Bíblias (Outros Idiomas)' },
  { id: 'b_7port_ing', code: 'B-7PORT/ING', name: 'Bíblia Bilíngue Português e Inglês, Formato 21x14 cm', price: 80.00, category: 'Bíblias (Outros Idiomas)' },
  { id: 'b_7e', code: 'B-7E', name: 'Bíblia Espanhol, recouro, letra grande', price: 60.00, category: 'Bíblias (Outros Idiomas)' },
  { id: 'b_1fr', code: 'B-1FR', name: 'B-FRANCÊS - média - modelo básico', price: 30.00, category: 'Bíblias (Outros Idiomas)' },
  { id: 'b_3ing', code: 'B-3ING', name: 'B-INGLÊS - luxo - média - preta', price: 80.00, category: 'Bíblias (Outros Idiomas)' },
  { id: 'b_5ing', code: 'B-5ING', name: 'Bíblia Inglês, recouro, beira dourada, Formato 21x28 cm', price: 160.00, category: 'Bíblias (Outros Idiomas)' },
  { id: 'b_3ita', code: 'B-3ITA', name: 'Bíblia Italiana, recouro, beira dourada, Formato 14x21 cm', price: 76.00, category: 'Bíblias (Outros Idiomas)' },
  { id: 'b_5ita', code: 'B-5 ITA', name: 'Bíblia Italiana, recouro, beira dourada, Formato 21x28 cm', price: 215.00, category: 'Bíblias (Outros Idiomas)' },
  { id: 'b_7ita', code: 'B-7ITA', name: 'B-ITALIANA - recurso preto - grande', price: 95.00, category: 'Bíblias (Outros Idiomas)' },

  // ARTIGOS DA PIEDADE E VIAGENS (MANUTENÇÃO)
  { id: 'c_1', code: 'C-1', name: 'Ficha de apresentação de caso - Bloco c/ 50 vias', price: 3.00, category: 'Artigos Piedade e Viagens', isManutencao: true },
  { id: 'c_3', code: 'C-3', name: 'Envelope Atendimento Obra Pia - Em Branco', price: 0.20, category: 'Artigos Piedade e Viagens', isManutencao: true },
  { id: 'c_7', code: 'C-7', name: 'Envelope de Despesas de Viagem', price: 0.20, category: 'Artigos Piedade e Viagens', isManutencao: true },
  { id: 'c_36', code: 'C-36', name: 'Caderneta Obra Piedade', price: 3.00, category: 'Artigos Piedade e Viagens', isManutencao: true },

  // LIVROS / DIVERSOS
  { id: 'c_18', code: 'C-18', name: 'Pedidos de Oração - PACOTE C/ 25 BLOCOS', price: 25.00, category: 'Livros / Diversos', isManutencao: true },
  { id: 'c_19', code: 'C-19', name: 'Recitativos - PACOTE C/ 25 BLOCOS', price: 25.00, category: 'Livros / Diversos', isManutencao: true },
  { id: 'c_20', code: 'C-20', name: 'Apresentação de Irmãs para Obra Pia', price: 15.00, category: 'Livros / Diversos', isManutencao: true },
  { id: 'c_21', code: 'C-21', name: 'Apresentação em Oração Ministerial', price: 8.00, category: 'Livros / Diversos', isManutencao: true },
  { id: 'c_21a', code: 'C-21A', name: 'Apres.Oração Ministerial Coop.Ofício Ministerial', price: 10.00, category: 'Livros / Diversos', isManutencao: true },
  { id: 'c_21b', code: 'C-21B', name: 'Apres. Oração Ministerial Coop.Jovens e Menores', price: 10.00, category: 'Livros / Diversos', isManutencao: true },
  { id: 'c_34', code: 'C-34', name: 'Calção de borracha para batismo', price: 300.00, category: 'Livros / Diversos' },
  { id: 'c_41', code: 'C-41', name: 'Envelope para recebimento de Coletas', price: 0.20, category: 'Livros / Diversos', isManutencao: true },
  { id: 'c_42', code: 'C-42', name: 'Livro de Adesão Mod.1 - Construção e Reforma', price: 20.00, category: 'Livros / Diversos', isManutencao: true },
  { id: 'c_43n', code: 'C-43 N', name: 'Livro de Presenças Mod.2 - Construção e Reforma', price: 35.00, category: 'Livros / Diversos', isManutencao: true },
  { id: 'c_44', code: 'C-44', name: 'Livro de Adesão Mod.3 - Adm., Limpeza e outros', price: 20.00, category: 'Livros / Diversos', isManutencao: true },
  { id: 'c_45n', code: 'C-45 N', name: 'Livro de Presenças Mod.4 - Adm., Limp.e outros', price: 35.00, category: 'Livros / Diversos', isManutencao: true },
  { id: 'c_47', code: 'C-47', name: 'Jaqueta de nylon para batismo', price: 70.00, category: 'Livros / Diversos' },
  { id: 'c_48a', code: 'C-48A', name: 'Livro de manutenção preventiva', price: 25.00, category: 'Livros / Diversos', isManutencao: true },
  { id: 'c_50', code: 'C-50', name: 'Livro Registro de Coletas - Carbonado', price: 25.00, category: 'Livros / Diversos', isManutencao: true },
  { id: 'c_51', code: 'C-51', name: 'Cartão identificação p/Colaboradores-S/ IMPRESSÃO', price: 2.00, category: 'Livros / Diversos', isManutencao: true },
  { id: 'c_53', code: 'C-53', name: 'kit Etiqueta Patrimônio ( caixa com 1.008 etiquetas )', price: 380.00, category: 'Livros / Diversos', isManutencao: true },
  { id: 'dic_01', code: 'DIC-01', name: 'Dicionário Bíblico TYNDALE', price: 130.00, category: 'Livros / Diversos' },
  { id: 'rel_89', code: 'REL-89', name: 'Relatório Edição Nº 89/2026', price: 25.00, category: 'Livros / Diversos' },

  // MÉTODOS / MANUAIS
  { id: 'msa', code: 'MSA', name: 'Manual de Aprendizado Simplificado', price: 12.00, category: 'Métodos / Manuais' },
  { id: 'moo', code: 'MOO', name: 'Manual Orientação Orquestra', price: 8.00, category: 'Métodos / Manuais' },
  { id: 'mor_v1', code: 'MOR-V1', name: 'Estudo p/ Órgão Eletrônico - VOL. 1', price: 8.00, category: 'Métodos / Manuais' },
  { id: 'mor_v2', code: 'MOR-V2', name: 'Estudo p/ Órgão Eletrônico - VOL. 2', price: 9.00, category: 'Métodos / Manuais' },
  { id: 'mor_v3', code: 'MOR-V3', name: 'Estudo p/ Órgão Eletrônico - VOL. 3', price: 9.00, category: 'Métodos / Manuais' },
  { id: 'mor_v4', code: 'MOR-V4', name: 'Estudo p/ Órgão Eletrônico - VOL. 4', price: 8.00, category: 'Métodos / Manuais' },
  { id: 'min_manual', code: 'MIN', name: 'Manual p/ Instruitora', price: 5.00, category: 'Métodos / Manuais' },

  // VÉUS
  { id: 'va_a', code: 'VA-A', name: 'Véu de algodão, para adulto', price: 12.00, category: 'Véus' },
  { id: 'va_c', code: 'VA-C', name: 'Véu de algodão, para criança', price: 10.00, category: 'Véus' },
  { id: 'vb_a', code: 'VB-A', name: 'Véu c/ bolsa - adulto', price: 25.00, category: 'Véus' },
  { id: 'vb_c', code: 'VB-C', name: 'Véu c/ bolsa - criança', price: 20.00, category: 'Véus' },
  { id: 'vr_a', code: 'VR-A', name: 'Véu Redondo de algoão, para adulto', price: 25.00, category: 'Véus' },

  // PRODUTOS SANTA CEIA (MANUTENÇÃO)
  { id: 'c_26', code: 'C-26', name: 'Toalha com 4 guardanapos para Santa Ceia', price: 220.00, category: 'Santa Ceia', isManutencao: true },
  { id: 'c_27n', code: 'C-27N', name: 'Jarra de vidro', price: 50.00, category: 'Santa Ceia', isManutencao: true },
  { id: 'c_28n', code: 'C-28 N', name: 'Cálice de vidro com bico - NOVO', price: 28.00, category: 'Santa Ceia', isManutencao: true },
  { id: 'c_29', code: 'C-29', name: 'Pires de aço inox pequeno 20 cm - para Cálice', price: 30.00, category: 'Santa Ceia', isManutencao: true },
  { id: 'c_30', code: 'C-30', name: 'Pires de aço inox grande 25 cm - para Jarra', price: 35.00, category: 'Santa Ceia', isManutencao: true },
  { id: 'c_31', code: 'C-31', name: 'Prato de aço inox pequeno 30 cm - para Pão pedaço', price: 40.00, category: 'Santa Ceia', isManutencao: true },
  { id: 'c_32', code: 'C-32', name: 'Prato de aço inox grande 35 cm - para Pão inteiro', price: 50.00, category: 'Santa Ceia', isManutencao: true },
  { id: 'c_58', code: 'C-58', name: 'Suporte de copinhos', price: 12.00, category: 'Santa Ceia', isManutencao: true },
  { id: 'c_70', code: 'C-70', name: 'Copo de acrílico para Santa Ceia', price: 0.20, category: 'Santa Ceia', isManutencao: true },

  // PLACAS E LETREIROS (MANUTENÇÃO)
  { id: 'c_24', code: 'C-24', name: 'Placa "Em Nome do Senhor Jesus" 84 x 40 cm,acrílico', price: 25.00, category: 'Placas e Letreiros', isManutencao: true },
  { id: 'c_25', code: 'C-25', name: 'Placa "Casa de Oração" - 84 x 40 cm, acrílico', price: 25.00, category: 'Placas e Letreiros', isManutencao: true },
  { id: 'c_54', code: 'C-54', name: 'Placa Discriminação Racial', price: 7.00, category: 'Placas e Letreiros', isManutencao: true },
  { id: 'c_59', code: 'C-59', name: 'Placa "Constituição da Igreja" - Pequena 18 x 31,5 cm', price: 13.00, category: 'Placas e Letreiros', isManutencao: true },
  { id: 'c_60', code: 'C-60', name: 'Placa "Constituição da Igreja" - Média 21 x 37 cm', price: 15.00, category: 'Placas e Letreiros', isManutencao: true },
  { id: 'c_61', code: 'C-61', name: 'Placa "Constituição da Igreja" - Grande 26,5 x 47,5 cm', price: 20.00, category: 'Placas e Letreiros', isManutencao: true },
  { id: 'c_66', code: 'C-66', name: 'Placa "Proibido Filmar e Fotografar" - Padrão 25 x 33 cm', price: 10.00, category: 'Placas e Letreiros', isManutencao: true },
  { id: 'c_62', code: 'C-62', name: 'Letreiro em Acrilico p/ Púlpito cor Prata (Altura 6,5 cm)', price: 50.00, category: 'Placas e Letreiros', isManutencao: true },
  { id: 'c_63', code: 'C-63', name: 'Letreiro em Acrilico p/ Púlpito cor Dourada (Altura 6,5 cm)', price: 50.00, category: 'Placas e Letreiros', isManutencao: true },

  // LETREIROS PVC
  { id: 'let_i01', code: 'LET-I01', name: 'Letreiro Interno PVC "EM NOME DO SENHOR JESUS" 250 x 15 cm', price: 160.00, category: 'Letreiros PVC', isManutencao: true },
  { id: 'let_i02', code: 'LET-I02', name: 'Letreiro Interno PVC 300 x 18 cm', price: 230.00, category: 'Letreiros PVC', isManutencao: true },
  { id: 'let_e01', code: 'LET-E01', name: 'Letreiro Externo PVC "CONGREGAÇÃO CRISTÃ..." 250 x 12 cm', price: 140.00, category: 'Letreiros PVC', isManutencao: true },
  { id: 'let_e02', code: 'LET-E02', name: 'Letreiro Externo PVC 300 x 15 cm', price: 210.00, category: 'Letreiros PVC', isManutencao: true },

  // BATISMO
  { id: 'tnq_01', code: 'TNQ-01', name: 'Tanque para Batismo em Lona', price: 1600.00, category: 'Batismo', isManutencao: true },
];

const CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))];

// Função auxiliar para normalizar string (remover acentos)
const normalizeString = (str: string) => 
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

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

  const filteredProducts = useMemo(() => {
    const normalizedSearch = normalizeString(searchTerm);
    return PRODUCTS.filter(p => 
      normalizeString(p.name).includes(normalizedSearch) || 
      normalizeString(p.code).includes(normalizedSearch)
    );
  }, [searchTerm]);

  const totals = useMemo(() => {
    let general = 0;
    let manutencao = 0;
    Object.entries(quantities).forEach(([id, qty]) => {
      const product = PRODUCTS.find(p => p.id === id);
      if (product) {
        const subtotal = product.price * qty;
        general += subtotal;
        if (product.isManutencao) {
          manutencao += subtotal;
        }
      }
    });
    return {
      general,
      manutencao,
      biblico: general - manutencao
    };
  }, [quantities]);

  const copyOrder = () => {
    const selectedItems = PRODUCTS.filter(p => (quantities[p.id] || 0) > 0);
    if (selectedItems.length === 0) return;

    let text = `*PEDIDO DA DISTRIBUIDORA*\n\n`;
    selectedItems.forEach(p => {
      text += `• ${quantities[p.id]}x [${p.code}] ${p.name}: R$ ${(p.price * quantities[p.id]).toFixed(2)}\n`;
    });
    text += `\n--- TOTALIZADORES ---\n`;
    text += `Fundo Bíblico: R$ ${totals.biblico.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
    text += `Manutenção: R$ ${totals.manutencao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
    text += `*TOTAL GERAL: R$ ${totals.general.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}*`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generatePDF = () => {
    const selectedItems = PRODUCTS.filter(p => (quantities[p.id] || 0) > 0);
    if (selectedItems.length === 0) return;

    const doc = new jsPDF();
    const dateStr = new Date().toLocaleDateString('pt-BR');

    doc.setFontSize(16);
    doc.setTextColor(0, 51, 102);
    doc.text('CONGREGAÇÃO CRISTÃ NO BRASIL', 14, 15);
    doc.setFontSize(12);
    doc.text('PEDIDO DA DISTRIBUIDORA', 14, 22);
    
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
      head: [['Código', 'Descrição', 'Quant.', 'Unitário', 'Subtotal']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [0, 51, 102] },
      styles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 25 },
        2: { halign: 'center', cellWidth: 15 },
        3: { halign: 'right' },
        4: { halign: 'right' }
      }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text(`Fundo Bíblico: R$ ${totals.biblico.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 14, finalY);
    doc.text(`Manutenção: R$ ${totals.manutencao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 14, finalY + 7);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`TOTAL GERAL: R$ ${totals.general.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 14, finalY + 16);

    doc.save(`Pedido_CCB_${dateStr.replace(/\//g, '-')}.pdf`);
  };

  return (
    <div className="min-h-screen pb-48 bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="header-gradient text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <FileText className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold leading-tight">PEDIDO DISTRIBUIDORA</h1>
                <p className="text-blue-100 text-[10px] md:text-xs opacity-80 uppercase tracking-widest font-semibold">Tabela de Preços 2024/2025</p>
              </div>
            </div>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 group-focus-within:text-white transition-colors w-5 h-5" />
              <input 
                type="text" 
                placeholder="Pesquisar..."
                className="pl-10 pr-4 py-2.5 bg-blue-900/40 border border-blue-400/30 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-80 transition-all text-sm backdrop-blur-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto w-full px-4 mt-6 space-y-8 flex-1">
        {searchTerm && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-400">Nenhum item encontrado</h3>
            <p className="text-slate-400">Tente buscar por código ou parte do nome.</p>
          </div>
        )}

        {CATEGORIES.map(category => {
          const productsInCategory = filteredProducts.filter(p => p.category === category);
          if (productsInCategory.length === 0) return null;

          return (
            <section key={category} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-100/50 px-5 py-3 border-b border-slate-200 flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-blue-600" />
                <h2 className="font-extrabold text-slate-800 uppercase tracking-wider text-xs md:text-sm">{category}</h2>
                <span className="ml-auto text-[10px] font-bold bg-white text-slate-500 border border-slate-200 px-2 py-0.5 rounded-full">
                  {productsInCategory.length}
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {productsInCategory.map(product => (
                  <div key={product.id} className="p-4 flex flex-col md:flex-row md:items-center gap-4 hover:bg-blue-50/30 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded uppercase">{product.code}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${product.isManutencao ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                          {product.isManutencao ? 'Manut' : 'Biblico'}
                        </span>
                      </div>
                      <h3 className="text-slate-700 text-sm font-semibold leading-tight mb-1 truncate md:whitespace-normal">{product.name}</h3>
                      <p className="text-blue-600 font-bold text-sm">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0">
                      <div className="flex items-center bg-slate-200/50 rounded-xl p-1 border border-slate-200">
                        <button 
                          onClick={() => updateQuantity(product.id, -1)}
                          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-white rounded-lg text-slate-700 active:scale-90 transition-all font-bold shadow-sm"
                        >
                          -
                        </button>
                        <input 
                          type="number"
                          className="w-12 md:w-16 text-center bg-transparent border-none focus:ring-0 font-extrabold text-slate-800 text-sm md:text-base"
                          value={quantities[product.id] || ''}
                          onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                          placeholder="0"
                        />
                        <button 
                          onClick={() => updateQuantity(product.id, 1)}
                          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-white rounded-lg text-slate-700 active:scale-90 transition-all font-bold shadow-sm"
                        >
                          +
                        </button>
                      </div>
                      <div className="w-24 text-right">
                        <p className="text-[10px] text-slate-400 uppercase font-bold mb-0.5">Subtotal</p>
                        <p className="font-extrabold text-blue-600 text-sm md:text-base">
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

      {/* Footer Totals */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-15px_40px_rgba(0,0,0,0.1)] z-40">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 items-end gap-4 mb-4">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight mb-1">Fundo Bíblico</p>
              <p className="text-sm md:text-lg font-bold text-slate-700">R$ {totals.biblico.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight mb-1">Manutenção</p>
              <p className="text-sm md:text-lg font-bold text-slate-700">R$ {totals.manutencao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="col-span-2 md:col-span-2 bg-blue-50 p-3 rounded-xl border border-blue-100 flex flex-col justify-center">
              <p className="text-[10px] text-blue-500 uppercase font-bold tracking-tight mb-1">Total Geral do Pedido</p>
              <p className="text-xl md:text-2xl font-black text-blue-700">R$ {totals.general.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={clearAll}
              className="flex items-center justify-center gap-2 h-12 px-4 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold text-xs border border-slate-200"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Limpar Tudo</span>
            </button>
            
            <button 
              onClick={generatePDF}
              disabled={totals.general === 0}
              className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-xl font-bold transition-all shadow-sm text-xs border ${
                totals.general > 0 
                ? 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'
                : 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
              }`}
            >
              <FileText className="w-5 h-5" />
              GERAR PDF
            </button>

            <button 
              onClick={copyOrder}
              disabled={totals.general === 0}
              className={`flex-[2] flex items-center justify-center gap-2 h-12 rounded-xl font-bold transition-all shadow-md text-xs ${
                totals.general > 0 
                ? (copied ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95')
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  COPIADO PARA WHATSAPP!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  COPIAR RESUMO
                </>
              )}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
