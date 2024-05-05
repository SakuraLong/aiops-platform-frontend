export const traceGraph = [
  {
    'timestamp': 1714838400123700,
    'cmdb_id': 'frontend',
    'span_id': 'b3475a795fad4d39',
    'duration': 32901,
    'type': 'request',
    'status_code': 0,
    'operation_name': '/hipstershop.FrontendService/HomeGrpc',
    'parent_span': ''
  },
  {
    'timestamp': 1714838400123789,
    'cmdb_id': 'frontend',
    'span_id': 'c44fa22ed5536524',
    'duration': 3343,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.CurrencyService/GetSupportedCurrencies',
    'parent_span': 'b3475a795fad4d39'
  },
  {
    'timestamp': 1714838400127142,
    'cmdb_id': 'frontend',
    'span_id': '79d984f852ee1a70',
    'duration': 2437,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.ProductCatalogService/ListProducts',
    'parent_span': 'b3475a795fad4d39'
  },
  {
    'timestamp': 1714838400128496,
    'cmdb_id': 'productcatalogservice',
    'span_id': 'd84b9afd0b3b16c5',
    'duration': 24,
    'type': 'request',
    'status_code': 0,
    'operation_name': '/hipstershop.ProductCatalogService/ListProducts',
    'parent_span': '79d984f852ee1a70'
  },
  {
    'timestamp': 1714838400129599,
    'cmdb_id': 'frontend',
    'span_id': 'c1cbc6a9a3a91534',
    'duration': 3801,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.CartService/GetCart',
    'parent_span': 'b3475a795fad4d39'
  },
  {
    'timestamp': 1714838400131058,
    'cmdb_id': 'cartservice',
    'span_id': '0b3691c640baa776',
    'duration': 1469,
    'type': 'request',
    'status_code': 200,
    'operation_name': '/hipstershop.CartService/GetCart',
    'parent_span': 'c1cbc6a9a3a91534'
  },
  {
    'timestamp': 1714838400133425,
    'cmdb_id': 'frontend',
    'span_id': '2d8fd3ffd48b67cc',
    'duration': 3433,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.CurrencyService/Convert',
    'parent_span': 'b3475a795fad4d39'
  },
  {
    'timestamp': 1714838400136862,
    'cmdb_id': 'frontend',
    'span_id': 'c555e4b3116dadc9',
    'duration': 2469,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.CurrencyService/Convert',
    'parent_span': 'b3475a795fad4d39'
  },
  {
    'timestamp': 1714838400139336,
    'cmdb_id': 'frontend',
    'span_id': '07a50879d3faa54b',
    'duration': 2710,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.CurrencyService/Convert',
    'parent_span': 'b3475a795fad4d39'
  },
  {
    'timestamp': 1714838400142062,
    'cmdb_id': 'frontend',
    'span_id': 'bfd7a49e6bead15d',
    'duration': 1988,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.CurrencyService/Convert',
    'parent_span': 'b3475a795fad4d39'
  },
  {
    'timestamp': 1714838400144064,
    'cmdb_id': 'frontend',
    'span_id': 'f29fcc3d8f274777',
    'duration': 1885,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.CurrencyService/Convert',
    'parent_span': 'b3475a795fad4d39'
  },
  {
    'timestamp': 1714838400145957,
    'cmdb_id': 'frontend',
    'span_id': '2e438e0dbc94ac3a',
    'duration': 4487,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.CurrencyService/Convert',
    'parent_span': 'b3475a795fad4d39'
  },
  {
    'timestamp': 1714838400150451,
    'cmdb_id': 'frontend',
    'span_id': '15a5ca6779c9452e',
    'duration': 2124,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.CurrencyService/Convert',
    'parent_span': 'b3475a795fad4d39'
  },
  {
    'timestamp': 1714838400152589,
    'cmdb_id': 'frontend',
    'span_id': 'b1e09b8d5a367c4f',
    'duration': 1988,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.CurrencyService/Convert',
    'parent_span': 'b3475a795fad4d39'
  },
  {
    'timestamp': 1714838400154583,
    'cmdb_id': 'frontend',
    'span_id': '48d51a8d57326c15',
    'duration': 2004,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.CurrencyService/Convert',
    'parent_span': 'b3475a795fad4d39'
  }
]
