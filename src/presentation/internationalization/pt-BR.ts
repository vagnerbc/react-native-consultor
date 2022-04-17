import * as Pedido from '../../domain/models/pedido'

export const commons = {
  add: `Adicionar`,
  unavailable: `Indisponível`,
  askHelp: `Preciso de ajuda`,
  chat: `Chat`,
  whatsapp: `Whatsapp`,
  units: `unidades`,
  unit: `un`,
  select: `Selecionar`,
  confirm: `Confirmar`,
  replace: `Substituir`,
  continue: `Continuar`,
  cancel: `Cancelar`,
  back: `Voltar`,
  total: `Total a pagar`,
  close: `Fechar`,
  clear: `Limpar`,
  subtotal: 'Subtotal',
  discount: `Desconto`,
  searchBy: `Busca por`,
  seeMore: `Ver mais`,
  order: 'pedido',
  cart: `carrinho`
}

export const buscaCliente = {
  placeholder: `Buscar cliente`
}

export const buscaGeral = {
  placeholder: `Procurar na Yandeh por produtos, fornecedores, indústrias, marcas, EAN, DUN`,
  placeholderShort: `Procurar na Yandeh`
}

export const catalogo = {
  added: `Adicionados`,
  filter: {
    tabs: {
      general: `Geral`
    }
  },
  header: {
    orderBy: 'Ordenado por'
  },
  produto: {
    recommendation: 'Recomendados',
    suggestion: 'Aceitar sugestão'
  },
  sidebar: {
    paymentInfo: {
      select: 'Selecione o meio de pagamento',
      total: 'Valor do pedido',
      minimum: 'Pedido mínimo',
      limit: 'Limite disponível',
      alpe: 'Saldo Alpe'
    },
    filters: {
      title: 'Filtros',
      industries: 'Indústrias',
      brands: 'Marcas',
      categories: 'Categorias',
      subcategories: 'Subcategorias'
    },
    sort: {
      default: 'Padrão',
      alphabetical: 'A-Z',
      giro: 'Maior Giro'
    }
  }
}

export const paymentMethodModal = {
  pedidoTotal: 'Valor do pedido',
  minimum: 'Pedido mínimo',
  limitAvailable: 'Limite disponível',
  pix: 'À vista no PIX',
  empty: 'Nenhum meio de pagamento disponível',
  table: {
    labels: {
      method: 'Meio de pagamento',
      total: 'Valor a ser pago',
      difference: 'Diferença'
    },
    limiteBoleto: 'Limite disponível para boletos'
  },
  alert:
    'Não há limite disponível suficiente para efetuar o pedido com esta forma de pagamento.'
}

export const comprarNovamenteModal = {
  title: 'Produtos duplicados',
  duplicate: 'Estes itens já estão em seu carrinho de compra',
  total: 'Total fornecedor',
  unavailable: 'Itens em falta',
  disregard: 'Desconsiderar itens',
  unitsOn: 'unidades no'
}

export const finalizarPedido = {
  fornecedor: {
    independente: 'Fornecedores com crédito Independente',
    yandeh: 'Fornecedores com crédito Yandeh',
    avaliableCredit: 'Crédito disponível',
    sumBankslip: 'Soma dos valores em boleto'
  },
  tooltips: {
    unavailableCredit: 'Crédito insuficiente para realizar esta compra',
    unavailableCreditVariant: `Você não possui crédito suficiente para realizar esta compra`,
    insufficientFunds: `Saldo insuficiente para realizar esta compra`
  },
  pedido: {
    selectPayment: 'Selecione o meio de pagamento',
    quantity: 'Quantidade de itens',
    avaliableCredit: 'Crédito disponível',
    deliveryEstimate: 'Estimativa de entrega',
    minimumOrder: 'Pedido mínimo',
    total: 'Valor total',
    buttons: {
      view: 'Visualizar itens',
      hide: 'Ocultar itens',
      finalize: 'Finalizar compra'
    },
    list: {
      subtotal: 'Subtotal fornecedor',
      back: 'Voltar ao Catálogo',
      excludePedido: 'Excluir pedido'
    }
  }
}

export const meusPedidos = {
  title: `Meus pedidos`,
  subtitle: `Acompanhe os pedidos realizados`,
  filters: `Filtros`,
  clearFilters: `Limpar filtros`,
  card: {
    orderStatus: 'Status do pedido',
    deliveryDate: 'data de entrega',
    paymentMethod: 'Forma de pagamento',
    orderNumber: 'Número do pedido',
    orderValue: 'Valor da compra',
    showDetail: 'Ver detalhes',
    hideDetail: 'Ocultar detalhes',
    buyAgain: 'Comprar novamente'
  },
  cardDetails: {
    orderTotal: 'Total do pedido',
    orderDateIn: 'Pedido realizado em',
    boughtItems: 'Itens comprados',
    totalIndustry: 'Total Indústria'
  },
  details: {
    billet: `2 via boleto`,
    export: `Exportar`,
    downloadNF: `Baixar NF`,
    invoice: 'Nota fiscal',
    devolutionInvoice: 'Nota fiscal de devolução'
  },
  alertStatus: {
    cancelled: `Você cancelou este pedido. Os produtos voltarão para seu carrinho de compras.`,
    devolution: `Seu pedido está em processo de devolução. Em breve, atualizaremos a NF e boleto para pagamento.`,
    outOfStock: `Alguns itens ficaram fora de estoque, reembolsaremos o valor na sua conta.`,
    sended: `Para rastrear seu pedido, acesse {{link}} e utilize o código {{code}}.`,
    creditNotApproved: `Seu crédito não foi aprovado. Você tem 24 horas para modificar a forma de pagamento e continuar com seu pedido.`,
    latePayment: `O pagamento desse pedido está atrasado. Realize o pagamento ou entre em contato com seu Consultor para nova via.`,
    priceChange: `Este pedido possui alteração de preço.`
  },
  stepperStatus: {
    [Pedido.STATUS_PEDIDO_REALIZADO]: 'Pedido realizado',
    [Pedido.STATUS_AGUARDANDO_PAGAMENTO]: 'Aguardando pagamento',
    [Pedido.STATUS_CANCELADO]: 'Cancelado',
    [Pedido.STATUS_PROCESSANDO]: 'Processando',
    [Pedido.STATUS_EM_ANALISE]: 'Em análise',
    [Pedido.STATUS_EM_SEPARACAO]: 'Em separação',
    [Pedido.STATUS_ENVIADO]: 'Enviado',
    [Pedido.STATUS_ENTREGUE]: 'Entregue'
  },
  statusTitle: {
    [Pedido.STATUS_PEDIDO_REALIZADO]: 'Pedido realizado',
    [Pedido.STATUS_AGUARDANDO_PAGAMENTO]: 'Aguardando pagamento',
    [Pedido.STATUS_CANCELADO]: 'Pedido cancelado',
    [Pedido.STATUS_PROCESSANDO]: 'Processando pedido',
    [Pedido.STATUS_EM_ANALISE]: 'Pedido em análise',
    [Pedido.STATUS_EM_SEPARACAO]: 'Em separação',
    [Pedido.STATUS_ENVIADO]: 'Pedido Enviado',
    [Pedido.STATUS_ENTREGUE]: 'Pedido entregue'
  },
  statusDescription: {
    [Pedido.STATUS_PEDIDO_REALIZADO]:
      'Estamos aguardando o pagamento do seu pedido',
    [Pedido.STATUS_AGUARDANDO_PAGAMENTO]:
      'Estamos aguardando o pagamento do seu pedido',
    [Pedido.STATUS_CANCELADO]:
      'Seu pedido foi cancelado. Saiba mais em "Ver detalhes”',
    [Pedido.STATUS_PROCESSANDO]: 'Estamos processando seu pedido',
    [Pedido.STATUS_EM_ANALISE]: 'Estamos analisando seu pedido',
    [Pedido.STATUS_EM_SEPARACAO]: 'Seu pedido já está em separação',
    [Pedido.STATUS_ENVIADO]:
      'Seu pedido já está a caminho. Veja como rasteá-lo em "Ver detalhes”',
    [Pedido.STATUS_ENTREGUE]: 'Seu pedido foi entregue.'
  }
}

export const pedido = {
  title: `Pedidos`,
  excludePedido: `Excluir pedido`,
  excludeAll: `Excluir todos os itens`,
  backToCatalogo: `Voltar ao Catálogo`,
  subtotal: `Subtotal fornecedor:`,
  changePackage: `Trocar embalagem`,
  packageWith: `Caixa com`,
  paymentMethod: `Meio de pagamento`,
  selectPayment: `Selecione o meio de pagamento`,
  confirmPayment: `Confirmação de pagamento`,
  confirmInfoAndCheckout: `Confirme os dados e finalize sua compra:`,
  quantityItems: `Quantidade de itens`,
  deliveryEstimate: `Estimativa de entrega`,
  minimumOrder: `Pedido mínimo`,
  minimumOrderOf: `Pedido mínimo de`,
  discount: `Desconto`,
  amount: `Valor Total`,
  minimumValue: `Valor mínimo:`,
  suppliersCredit: `Fornecedores com crédito Yandeh`,
  avaliableCredit: `Crédito disponível`,
  sumBankslip: `Soma dos valores em boleto`,
  supplierIndependent: `Fornecedores com crédito Independente`,
  unavailableCredit: `Crédito insuficiente para realizar esta compra.`,
  unavailableCreditVariant: `Você não possui crédito suficiente para realizar esta compra`,
  insufficientFunds: `Saldo insuficiente para realizar esta compra.`,
  viewItems: `Visualizar itens`,
  hideItems: `Ocultar itens`,
  finalizePurchase: `Finalizar compra`,
  lastOrder: `Último pedido`,
  weeklySale: `Giro semanal`,
  excludeAllModal: {
    warningInfoMessage: `Deseja excluir o pedido do fornecedor {{name}}? A ação não poderá ser desfeita.`
  },
  confirmPaymentModal: {
    warningInfoMessage: `Revise todos os dados do pedido, não será possível fazer alterações após a confirmação.`,
    confirmInfo: `Confirme os dados e finalize sua compra`,
    pedidoTotal: `Total do pedido`,
    deliveryAddress: `Endereço de entrega`,
    deliveryEstimative: `Estimativa de entrega`,
    requestAddressChange: `Solicitar troca de endereço`
  },
  confirmPedidoModal: {
    confirmPedido: `Confirmação de pedido`,
    successMessage: `Seu pedido foi efetuado com sucesso!`,
    pedidoNumber: `O número do seu pedido é`,
    pedidoDate: `Data do pedido`,
    reservedValue: `Valor reservado`,
    pix: {
      warningInfoMessage: `Realize o pagamento em até 1 dia útil, caso o pagamento não seja realizado, o seu pedido será automaticamente cancelado.`,
      generatePIX: `Gerar novo código`,
      generateQRCode: `Gerar QR Code`,
      expiredPIX: `Código PIX expirado`,
      expiredQRCode: `QR Code expirado`,
      pixExpiredDate: `Validade do código PIX`,
      qrcodeExpiredDate: `Validade do QR Code`,
      pixPayment: `Pagamento com PIX`,
      copyPix: `Copiar código PIX`,
      instructions: `Siga essas instruções`
    }
  },
  cancelPedidoModal: {
    title: `Cancelar pedido`,
    subtitle: `Tem certeza que deseja cancelar o pedido?`,
    description: `Os produtos voltarão para seu carrinho de compras, mas os preços podem sofrer alterações.`,
    reason: `Conte-nos o motivo de seu cancelamento:`,
    other: `Outro`,
    placeholder: `Insira aqui seu motivo`
  },
  finalizePedidos: {
    title: `Finalizar pedidos`
  }
}

export const helpModal = {
  subtitle: `Entre em contato conosco`,
  description: `Tenha em mãos o número do seu pedido: `
}

export const chatbot = {
  header: `Assistente virtual`
}

export const campaigns = {
  chamamix: {
    mixProduct: `Mix de produtos`,
    banner: {
      reachedGoal: `Você ganhou um desconto nos itens chamariz.`,
      skuProgress: `{{atual}} de {{meta}} itens distintos`,
      valueProgress: `{{atual}} de {{meta}}`,
      nextGoal: `Compre mais {{valor}} e mais {{quantidade}} itens distintos no mix para aumentar o limite de unidades com o desconto.`,
      nextGoalValue: `Compre mais {{valor}} em itens do mix para aumentar o limite de unidades com o desconto.`,
      nextGoalSku: `Compre mais {{valor}} itens distintos no mix para aumentar o limite de unidades com o desconto.`
    },
    product: {
      reachedGoal: `{{desconto}} de desconto em até {{unidades}} unidades`,
      nextGoal: `Compre mais {{valor}} em itens mix para aumentar o limite para {{unidades}} unidades com o desconto.`
    }
  },
  combo: {
    title: `Combos`,
    packing: `Combo`,
    item: {
      productQuantity: `{{quantity}} produtos`,
      oldPrice: `De: {{price}} sem o combo`,
      newPrice: `Por: {{price}}/combo`
    }
  }
}
