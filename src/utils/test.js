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

export const traceList = [
  {
    'trace_id': 'b3475a795fad4d3993459ef62fdb2f05',
    'duration': 32901,
    'operation_name': '/hipstershop.FrontendService/HomeGrpc',
    'timestamp': 1714838400123700,
    'status': 'Success'
  },
  {
    'trace_id': '8b4d59d35dc109f51e28e7d1af9a1777',
    'duration': 31267,
    'operation_name': '/hipstershop.FrontendService/ViewCartGrpc',
    'timestamp': 1714838400524677,
    'status': 'Success'
  },
  {
    'trace_id': '8e7f122d067b1f49521c1ea387f5f7eb',
    'duration': 31341,
    'operation_name': '/hipstershop.FrontendService/HomeGrpc',
    'timestamp': 1714838400726343,
    'status': 'Success'
  },
  {
    'trace_id': '769df55de1c1b171f99aa73c9d57c722',
    'duration': 26330,
    'operation_name': '/hipstershop.FrontendService/ProductGrpc',
    'timestamp': 1714838400878334,
    'status': 'Success'
  },
  {
    'trace_id': '7e99f59ddece6a43d559aa413d1dcbfe',
    'duration': 26346,
    'operation_name': '/hipstershop.FrontendService/ProductGrpc',
    'timestamp': 1714838400985912,
    'status': 'Success'
  },
  {
    'trace_id': '21c0aeca41a65e9bff0905482fc3f455',
    'duration': 25156,
    'operation_name': '/hipstershop.FrontendService/ProductGrpc',
    'timestamp': 1714838401246839,
    'status': 'Success'
  },
  {
    'trace_id': '3d1e201666552f080712f89a439a42db',
    'duration': 35189,
    'operation_name': '/hipstershop.FrontendService/HomeGrpc',
    'timestamp': 1714838401507483,
    'status': 'Success'
  },
  {
    'trace_id': 'a5be5af1ec45e5c2b44b042d4484fc5a',
    'duration': 34678,
    'operation_name': '/hipstershop.FrontendService/HomeGrpc',
    'timestamp': 1714838401871887,
    'status': 'Success'
  },
  {
    'trace_id': 'a13ab5ade4485289e7659cafe93e327d',
    'duration': 27783,
    'operation_name': '/hipstershop.FrontendService/ProductGrpc',
    'timestamp': 1714838401985343,
    'status': 'Success'
  }
]

export const logList = [
  {
    '_index': 'logstash-2024.05.06.16',
    '_id': 'PYSiTo8B4TzBxbAALSIy',
    '_score': null,
    '_source': {
      'event': {
        'original': '{"http.req.id":"9f740fc7-3960-4922-838d-a7b3fc877cdc","http.req.method":"GET","http.req.path":"/product/OLJCESPC7Z","message":"request started","session":"ae16c628-b91d-4786-ac32-b49040ee6478","severity":"debug","timestamp":"2024-05-06T16:00:00.14635971Z"}'
      },
      'kubernetes': {
        'replicaset': {
          'name': 'frontend-69c95fbb99'
        },
        'node': {
          'uid': 'a9689bd6-c826-43dc-a246-eab3318d845c',
          'hostname': 'minikube',
          'labels': {
            'minikube_k8s_io/name': 'minikube',
            'minikube_k8s_io/updated_at': '2024_04_09T17_01_19_0700',
            'node-role_kubernetes_io/control-plane': '',
            'kubernetes_io/os': 'linux',
            'node_kubernetes_io/exclude-from-external-load-balancers': '',
            'kubernetes_io/arch': 'amd64',
            'beta_kubernetes_io/os': 'linux',
            'beta_kubernetes_io/arch': 'amd64',
            'minikube_k8s_io/primary': 'true',
            'kubernetes_io/hostname': 'minikube',
            'minikube_k8s_io/version': 'v1.32.0',
            'minikube_k8s_io/commit': '8220a6eb95f0a4d75f7f2d7b14cef975f050512d'
          },
          'name': 'minikube'
        },
        'pod': {
          'uid': '8d7fe7c2-d078-40d1-a9d4-aa8aa85f7e68',
          'ip': '10.244.0.78',
          'name': 'frontend-69c95fbb99-4tbkt'
        },
        'deployment': {
          'name': 'frontend'
        },
        'namespace_uid': 'fea36337-fe6c-46a3-9c59-04dbd6755666',
        'namespace': 'default',
        'labels': {
          'app': 'frontend',
          'pod-template-hash': '69c95fbb99'
        },
        'container': {
          'name': 'server'
        },
        'namespace_labels': {
          'kubernetes_io/metadata_name': 'default'
        }
      },
      'ecs': {
        'version': '8.0.0'
      },
      'tags': [
        'beats_input_codec_plain_applied'
      ],
      'stream': 'stdout',
      'log': {
        'file': {
          'path': '/var/log/containers/frontend-69c95fbb99-4tbkt_default_server-d098b1e31a1af121d059448889e0e8f22096af80f6909c827a905d9a3badd57c.log'
        },
        'offset': 8457860
      },
      'message': '{"http.req.id":"9f740fc7-3960-4922-838d-a7b3fc877cdc","http.req.method":"GET","http.req.path":"/product/OLJCESPC7Z","message":"request started","session":"ae16c628-b91d-4786-ac32-b49040ee6478","severity":"debug","timestamp":"2024-05-06T16:00:00.14635971Z"}',
      '@version': '1',
      '@timestamp': '2024-05-06T16:00:00.146Z',
      'input': {
        'type': 'container'
      },
      'agent': {
        'ephemeral_id': 'd5d19ae6-7906-4f3e-be0b-f909f70088d3',
        'type': 'filebeat',
        'id': 'a88f0c23-4ded-4da8-b154-eaf4b92010cf',
        'version': '8.7.1',
        'name': 'filebeat-filebeat-b6bc4'
      },
      'host': {
        'name': 'filebeat-filebeat-b6bc4'
      },
      'container': {
        'runtime': 'docker',
        'id': 'd098b1e31a1af121d059448889e0e8f22096af80f6909c827a905d9a3badd57c',
        'image': {
          'name': 'wjjdoraemon/frontend:0.0.1'
        }
      }
    },
    'sort': [
      1715011200146
    ]
  },
  {
    '_index': 'logstash-2024.05.06.16',
    '_id': 'PoSiTo8B4TzBxbAALSIy',
    '_score': null,
    '_ignored': [
      'event.original.keyword',
      'message.keyword'
    ],
    '_source': {
      'event': {
        'original': '{"currency":"EUR","http.req.id":"9f740fc7-3960-4922-838d-a7b3fc877cdc","http.req.method":"GET","http.req.path":"/product/OLJCESPC7Z","id":"OLJCESPC7Z","message":"serving product page","session":"ae16c628-b91d-4786-ac32-b49040ee6478","severity":"debug","timestamp":"2024-05-06T16:00:00.146401748Z"}'
      },
      'kubernetes': {
        'replicaset': {
          'name': 'frontend-69c95fbb99'
        },
        'node': {
          'uid': 'a9689bd6-c826-43dc-a246-eab3318d845c',
          'hostname': 'minikube',
          'labels': {
            'minikube_k8s_io/name': 'minikube',
            'minikube_k8s_io/updated_at': '2024_04_09T17_01_19_0700',
            'kubernetes_io/os': 'linux',
            'node-role_kubernetes_io/control-plane': '',
            'node_kubernetes_io/exclude-from-external-load-balancers': '',
            'kubernetes_io/arch': 'amd64',
            'beta_kubernetes_io/os': 'linux',
            'beta_kubernetes_io/arch': 'amd64',
            'minikube_k8s_io/primary': 'true',
            'kubernetes_io/hostname': 'minikube',
            'minikube_k8s_io/version': 'v1.32.0',
            'minikube_k8s_io/commit': '8220a6eb95f0a4d75f7f2d7b14cef975f050512d'
          },
          'name': 'minikube'
        },
        'pod': {
          'uid': '8d7fe7c2-d078-40d1-a9d4-aa8aa85f7e68',
          'ip': '10.244.0.78',
          'name': 'frontend-69c95fbb99-4tbkt'
        },
        'deployment': {
          'name': 'frontend'
        },
        'namespace': 'default',
        'namespace_uid': 'fea36337-fe6c-46a3-9c59-04dbd6755666',
        'namespace_labels': {
          'kubernetes_io/metadata_name': 'default'
        },
        'labels': {
          'app': 'frontend',
          'pod-template-hash': '69c95fbb99'
        },
        'container': {
          'name': 'server'
        }
      },
      'ecs': {
        'version': '8.0.0'
      },
      'tags': [
        'beats_input_codec_plain_applied'
      ],
      'stream': 'stdout',
      'log': {
        'file': {
          'path': '/var/log/containers/frontend-69c95fbb99-4tbkt_default_server-d098b1e31a1af121d059448889e0e8f22096af80f6909c827a905d9a3badd57c.log'
        },
        'offset': 8458215
      },
      'message': '{"currency":"EUR","http.req.id":"9f740fc7-3960-4922-838d-a7b3fc877cdc","http.req.method":"GET","http.req.path":"/product/OLJCESPC7Z","id":"OLJCESPC7Z","message":"serving product page","session":"ae16c628-b91d-4786-ac32-b49040ee6478","severity":"debug","timestamp":"2024-05-06T16:00:00.146401748Z"}',
      '@version': '1',
      '@timestamp': '2024-05-06T16:00:00.146Z',
      'input': {
        'type': 'container'
      },
      'agent': {
        'ephemeral_id': 'd5d19ae6-7906-4f3e-be0b-f909f70088d3',
        'type': 'filebeat',
        'id': 'a88f0c23-4ded-4da8-b154-eaf4b92010cf',
        'version': '8.7.1',
        'name': 'filebeat-filebeat-b6bc4'
      },
      'host': {
        'name': 'filebeat-filebeat-b6bc4'
      },
      'container': {
        'runtime': 'docker',
        'id': 'd098b1e31a1af121d059448889e0e8f22096af80f6909c827a905d9a3badd57c',
        'image': {
          'name': 'wjjdoraemon/frontend:0.0.1'
        }
      }
    },
    'sort': [
      1715011200146
    ]
  }
]

export const metricChartData = [
  {
    'time': '2024-05-07T14:55:44+08:00',
    'value': 6.018
  },
  {
    'time': '2024-05-07T14:56:44+08:00',
    'value': 5.926
  },
  {
    'time': '2024-05-07T14:57:44+08:00',
    'value': 5.912
  },
  {
    'time': '2024-05-07T14:58:44+08:00',
    'value': 6.008
  },
  {
    'time': '2024-05-07T14:59:44+08:00',
    'value': 5.932
  },
  {
    'time': '2024-05-07T15:00:44+08:00',
    'value': 5.981
  },
  {
    'time': '2024-05-07T15:01:44+08:00',
    'value': 5.979
  },
  {
    'time': '2024-05-07T15:02:44+08:00',
    'value': 5.269
  },
  {
    'time': '2024-05-07T15:03:44+08:00',
    'value': 6.238
  },
  {
    'time': '2024-05-07T15:04:44+08:00',
    'value': 6.5
  },
  {
    'time': '2024-05-07T15:05:44+08:00',
    'value': 6.705
  },
  {
    'time': '2024-05-07T15:06:44+08:00',
    'value': 6.008
  },
  {
    'time': '2024-05-07T15:07:44+08:00',
    'value': 6.929
  },
  {
    'time': '2024-05-07T15:08:44+08:00',
    'value': 6.963
  },
  {
    'time': '2024-05-07T15:09:44+08:00',
    'value': 7.085
  },
  {
    'time': '2024-05-07T15:10:44+08:00',
    'value': 6.97
  }
]

export const logAmount = [
  {
    'date': '2024-04-22',
    'log_count': 31079388
  },
  {
    'date': '2024-04-23',
    'log_count': 46313163
  },
  {
    'date': '2024-04-24',
    'log_count': 42924056
  },
  {
    'date': '2024-04-25',
    'log_count': 21131043
  },
  {
    'date': '2024-04-26',
    'log_count': 8944692
  },
  {
    'date': '2024-04-27',
    'log_count': 18681753
  },
  {
    'date': '2024-04-28',
    'log_count': 41156201
  },
  {
    'date': '2024-04-29',
    'log_count': 41860245
  },
  {
    'date': '2024-04-30',
    'log_count': 41978902
  },
  {
    'date': '2024-05-01',
    'log_count': 42056743
  },
  {
    'date': '2024-05-02',
    'log_count': 41896006
  },
  {
    'date': '2024-05-03',
    'log_count': 42132430
  },
  {
    'date': '2024-05-04',
    'log_count': 42301200
  },
  {
    'date': '2024-05-05',
    'log_count': 41936763
  },
  {
    'date': '2024-05-06',
    'log_count': 42083426
  },
  {
    'date': '2024-05-07',
    'log_count': 15215786
  }
]
