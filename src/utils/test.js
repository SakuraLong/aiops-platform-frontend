export const traceGraph = [
  {
    'timestamp': 1716903608089327,
    'cmdb_id': 'frontend',
    'span_id': 'd35ef365fc326d17',
    'duration': 28165,
    'type': 'request',
    'status_code': 0,
    'operation_name': '/hipstershop.FrontendService/ProductGrpc',
    'parent_span': ''
  },
  {
    'timestamp': 1716903608089361,
    'cmdb_id': 'frontend',
    'span_id': 'dcc74e1b8d4ef045',
    'duration': 2451,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.ProductCatalogService/GetProduct',
    'parent_span': 'd35ef365fc326d17'
  },
  {
    'timestamp': 1716903608090750,
    'cmdb_id': 'productcatalogservice',
    'span_id': '449dc43dcd6dc577',
    'duration': 25,
    'type': 'request',
    'status_code': 0,
    'operation_name': '/hipstershop.ProductCatalogService/GetProduct',
    'parent_span': 'dcc74e1b8d4ef045'
  },
  {
    'timestamp': 1716903608091830,
    'cmdb_id': 'frontend',
    'span_id': '4af687978ee9fa77',
    'duration': 4319,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.CurrencyService/GetSupportedCurrencies',
    'parent_span': 'd35ef365fc326d17'
  },
  {
    'timestamp': 1716903608096159,
    'cmdb_id': 'frontend',
    'span_id': '49cd38199fddb621',
    'duration': 3156,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.CartService/GetCart',
    'parent_span': 'd35ef365fc326d17'
  },
  {
    'timestamp': 1716903608097327,
    'cmdb_id': 'cartservice',
    'span_id': '547b729eedaca8de',
    'duration': 1209,
    'type': 'request',
    'status_code': 200,
    'operation_name': '/hipstershop.CartService/GetCart',
    'parent_span': '49cd38199fddb621'
  },
  {
    'timestamp': 1716903608099329,
    'cmdb_id': 'frontend',
    'span_id': '958681be25c43c54',
    'duration': 2779,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.CurrencyService/Convert',
    'parent_span': 'd35ef365fc326d17'
  },
  {
    'timestamp': 1716903608102113,
    'cmdb_id': 'frontend',
    'span_id': '9f9c0f3f7e780b1a',
    'duration': 6491,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.RecommendationService/ListRecommendations',
    'parent_span': 'd35ef365fc326d17'
  },
  {
    'timestamp': 1716903608106158,
    'cmdb_id': 'productcatalogservice',
    'span_id': 'e7747c5a77b991fa',
    'duration': 33,
    'type': 'request',
    'status_code': 0,
    'operation_name': '/hipstershop.ProductCatalogService/ListProducts',
    'parent_span': '47209718fe54df29'
  },
  {
    'timestamp': 1716903608108692,
    'cmdb_id': 'frontend',
    'span_id': '75d2585f6a45ff24',
    'duration': 2262,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.ProductCatalogService/GetProduct',
    'parent_span': 'd35ef365fc326d17'
  },
  {
    'timestamp': 1716903608110082,
    'cmdb_id': 'productcatalogservice',
    'span_id': 'bd397ad9274a07bf',
    'duration': 27,
    'type': 'request',
    'status_code': 0,
    'operation_name': '/hipstershop.ProductCatalogService/GetProduct',
    'parent_span': '75d2585f6a45ff24'
  },
  {
    'timestamp': 1716903608110967,
    'cmdb_id': 'frontend',
    'span_id': 'faf57d18fead6590',
    'duration': 1742,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.ProductCatalogService/GetProduct',
    'parent_span': 'd35ef365fc326d17'
  },
  {
    'timestamp': 1716903608112012,
    'cmdb_id': 'productcatalogservice',
    'span_id': 'b9fda84ebdcffb31',
    'duration': 19,
    'type': 'request',
    'status_code': 0,
    'operation_name': '/hipstershop.ProductCatalogService/GetProduct',
    'parent_span': 'faf57d18fead6590'
  },
  {
    'timestamp': 1716903608112727,
    'cmdb_id': 'frontend',
    'span_id': '6a835db394e24224',
    'duration': 1482,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.ProductCatalogService/GetProduct',
    'parent_span': 'd35ef365fc326d17'
  },
  {
    'timestamp': 1716903608113561,
    'cmdb_id': 'productcatalogservice',
    'span_id': '4531fe8431a0a0e1',
    'duration': 18,
    'type': 'request',
    'status_code': 0,
    'operation_name': '/hipstershop.ProductCatalogService/GetProduct',
    'parent_span': '6a835db394e24224'
  },
  {
    'timestamp': 1716903608114222,
    'cmdb_id': 'frontend',
    'span_id': '5c1f1a7eed52a3f8',
    'duration': 1492,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.ProductCatalogService/GetProduct',
    'parent_span': 'd35ef365fc326d17'
  },
  {
    'timestamp': 1716903608115018,
    'cmdb_id': 'productcatalogservice',
    'span_id': '84b72963bdabc944',
    'duration': 16,
    'type': 'request',
    'status_code': 0,
    'operation_name': '/hipstershop.ProductCatalogService/GetProduct',
    'parent_span': '5c1f1a7eed52a3f8'
  },
  {
    'timestamp': 1716903608115729,
    'cmdb_id': 'frontend',
    'span_id': '302b190cec190f3b',
    'duration': 1749,
    'type': 'external',
    'status_code': 0,
    'operation_name': '/hipstershop.ProductCatalogService/GetProduct',
    'parent_span': 'd35ef365fc326d17'
  },
  {
    'timestamp': 1716903608116761,
    'cmdb_id': 'productcatalogservice',
    'span_id': 'dedd4b73dd54a716',
    'duration': 16,
    'type': 'request',
    'status_code': 0,
    'operation_name': '/hipstershop.ProductCatalogService/GetProduct',
    'parent_span': '302b190cec190f3b'
  }
]
