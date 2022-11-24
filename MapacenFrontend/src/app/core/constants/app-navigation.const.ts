import { AUTHENTICATION_APPLICATIONS, AUTHENTICATION_ROLES, AUTHENTICATION_SCOPES, DEVICES_FILES, DEVICES_FIRMWARE_UPGRADE, DEVICES_FISCALIZATION, DEVICES_HARDFAULTS, DEVICES_LIST, DEVICES_STATISTICS, DEVICE_SETTINGS_DEVICE_LIST, DEVICE_SETTINGS_SERVICE_LIST, DOCUMENTS_DAILY_REPORTS, DOCUMENTS_INVOICE_TO_RECEIPTS, DOCUMENTS_MONTHLY_REPORTS, DOCUMENTS_NONFISCAL_DOCUMENTS, DOCUMENTS_RECEIPTS, DOCUMENTS_RECEIPTS_CANCEL, EMAILS_LIST, EMAILS_TEMPLATES, PROMOTIONS_DEVICES, PROMOTIONS_PROMOTIONS, PROMOTIONS_PROMOTIONS_ON_DEVICES, SAP_INVOICES_LISTS, UBER_PARTNERS, UBER_TRIPS, UBER_UBER_INVOICES, UBER_UBER_METRICS, EVENTS, DEVICES_FIRMWARE_HISTORY, USERS_LIST, USERS_STATISTICS, STX_CREATE_WEBSOCKET_SESSION, FIRMWARE_VERSIONS, UPLOAD_NEW_FIRMWARE, TRANSACTIONS_LIST, TRANSACTIONS_DEVICES, TRANSACTIONS_METRICS, EVENTS_LIST, TRANSACTIONS_HOPSHOP_TRANSACTIONS, TRANSACTIONS_HOPSHOP_DEVICES, TRANSACTIONS_HOPSHOP_CALLBACKS, TRANSACTIONS_PAYTEL_TRANSACTIONS, TRANSACTIONS_PAYTEL_DEVICES, DEVICES_DETAILS, USERS_DETAILS, SERVICES_DEFINITION, INTEGRATOR_DASHBOARD, INTEGRATOR_USERS, INTEGRATOR_DEVICES, INTEGRATOR_BILLING, DOCUMENTS_STATISTICS, INTEGRATOR_ORDERS, TAXI_ORDERS_LIST, AUTHENTICATION_FIREWALL, UBER_UBER_MANAGEMENT, SUPPORT_FEEDBACK, USERS_AGREEMENTS, UBER_UBER_USER_TRIPS } from '@core/constans/role-pages';

import { RoutesPath } from '@core/enums/routes-path.enum';
import { Navigation } from '@layout/interfaces/navigation.interface';

export const navigation: Navigation[] = [
  {
    text: 'Uber',
    path: `/${RoutesPath.HOME}/${RoutesPath.UBER}`,
    icon: 'directions_car_filled',
    isCollapsed: false,
    isActive: false,
    isClient: false,
    children: [
      {
        text: 'Trips',
        path: `/${RoutesPath.HOME}/${RoutesPath.UBER}/${RoutesPath.TRIPS}`,
        icon: 'directions_car_filled',
        data: {
          roles: UBER_TRIPS
        },
        isContent: true,
      },
      {
        text: 'Partners',
        path: `/${RoutesPath.HOME}/${RoutesPath.UBER}/${RoutesPath.PARTNERS}`,
        icon: 'group',
        data: {
          roles: UBER_PARTNERS
        },
        isContent: true,
      },
      {
        text: 'Metrics',
        path: `/${RoutesPath.HOME}/${RoutesPath.UBER}/${RoutesPath.METRICS}`,
        icon: 'assessment',
        data: {
          roles: UBER_UBER_METRICS
        },
        isContent: true,
      },
      {
        text: 'Invoices',
        path: `/${RoutesPath.HOME}/${RoutesPath.UBER}/${RoutesPath.INVOICES}`,
        icon: 'assessment',
        data: {
          roles: UBER_UBER_INVOICES
        },
        isContent: true
      },
      {
        text: 'Management',
        path: `/${RoutesPath.HOME}/${RoutesPath.UBER}/${RoutesPath.MANAGEMENT}`,
        icon: 'assessment',
        data: {
          roles: UBER_UBER_MANAGEMENT
        },
        isContent: true
      },
      {
        text: 'User trips',
        path: `/${RoutesPath.HOME}/${RoutesPath.UBER}/${RoutesPath.USER_TRIPS}`,
        icon: 'assessment',
        data: {
          roles: UBER_UBER_USER_TRIPS
        },
        isContent: true
      },
    ]
  },
  {
    text: 'Devices',
    path: `/${RoutesPath.HOME}/${RoutesPath.DEVICES}`,
    icon: 'devices',
    isCollapsed: false,
    isActive: false,
    isClient: false,
    children: [
      {
        text: 'List',
        path: `/${RoutesPath.HOME}/${RoutesPath.DEVICES}/${RoutesPath.LIST}`,
        icon: 'directions_car_filled',
        data: {
          roles: DEVICES_LIST
        },
        isContent: true,
      },
      {
        text: 'Details',
        path: `/${RoutesPath.HOME}/${RoutesPath.DEVICES}/${RoutesPath.DETAILS}`,
        icon: 'icon-insert_chart_black_24dp',
        data: {
          roles: DEVICES_DETAILS
        },
        isContent: true,
      },
      {
        text: 'Statistics',
        path: `/${RoutesPath.HOME}/${RoutesPath.DEVICES}/${RoutesPath.STATISTICS}`,
        icon: 'group',
        data: {
          roles: DEVICES_STATISTICS
        },
        isContent: true,
      },
      {
        text: 'Fiscalization',
        path: `/${RoutesPath.HOME}/${RoutesPath.DEVICES}/${RoutesPath.FISCALIZATION}`,
        icon: 'assessment',
        data: {
          roles: DEVICES_FISCALIZATION
        },
      },
      {
        text: 'Firmware History',
        path: `/${RoutesPath.HOME}/${RoutesPath.DEVICES}/${RoutesPath.FIRMWARE_HISTORY}`,
        icon: 'assessment',
        data: {
          roles: DEVICES_FIRMWARE_HISTORY,
        },
        isContent: true,
      },
      {
        text: 'Firmware Upgrade',
        path: `/${RoutesPath.HOME}/${RoutesPath.DEVICES}/${RoutesPath.FIRMWARE_UPGRADE}`,
        // TODO do zmiany
        // path: '',
        icon: 'assessment',
        data: {
          roles: DEVICES_FIRMWARE_UPGRADE
        },
        isOuterLink: true,
        isContent: true,
      },
      {
        text: 'Hardfaults',
        path: `/${RoutesPath.HOME}/${RoutesPath.DEVICES}/${RoutesPath.HARDFAULTS}`,
        icon: 'assessment',
        data: {
          roles: DEVICES_HARDFAULTS
        },
        isContent: true,
      },
      {
        text: 'Files',
        path: `/${RoutesPath.HOME}/${RoutesPath.DEVICES}/${RoutesPath.FILES}`,
        icon: 'assessment',
        data: {
          roles: DEVICES_FILES
        },
        isContent: true,
      },
    ]
  },
  {
    text: 'Authentication',
    path: `/${RoutesPath.HOME}/${RoutesPath.AUTHENTICATION}`,
    icon: 'vpn_key',
    isCollapsed: false,
    isActive: false,
    isClient: false,
    children: [
      {
        text: 'Roles',
        path: `/${RoutesPath.HOME}/${RoutesPath.AUTHENTICATION}/${RoutesPath.ROLES}`,
        icon: 'article',
        data: {
          roles: AUTHENTICATION_ROLES
        },
        isContent: true,
      },
      {
        text: 'Scopes',
        path: `/${RoutesPath.HOME}/${RoutesPath.AUTHENTICATION}/${RoutesPath.SCOPES}`,
        icon: 'assignment',
        data: {
          roles: AUTHENTICATION_SCOPES
        },
        isContent: true,
      },
      {
        text: 'Applications',
        path: `/${RoutesPath.HOME}/${RoutesPath.AUTHENTICATION}/${RoutesPath.APPLICATIONS}`,
        icon: 'assignment',
        data: {
          roles: AUTHENTICATION_APPLICATIONS
        },
        isContent: true,
      },
      {
        text: 'Firewall',
        path: `/${RoutesPath.HOME}/${RoutesPath.AUTHENTICATION}/${RoutesPath.FIREWALL}`,
        icon: 'assignment',
        data: {
          roles: AUTHENTICATION_FIREWALL
        },
        isContent: true,
      },
    ]
  },
  {
    text: 'Users',
    path: `/${RoutesPath.HOME}/${RoutesPath.USERS}`,
    icon: 'people',
    isCollapsed: false,
    isActive: false,
    isClient: false,
    children: [
      {
        text: 'List',
        path: `/${RoutesPath.HOME}/${RoutesPath.USERS}/${RoutesPath.LIST}`,
        icon: 'receipt',
        data: {
          roles: USERS_LIST,
        },
        isContent: true,
      },
      {
        text: 'Details',
        path: `/${RoutesPath.HOME}/${RoutesPath.USERS}/${RoutesPath.DETAILS}`,
        icon: 'receipt',
        data: {
          roles: USERS_DETAILS,
        },
        isContent: true,
      },
      {
        text: 'Statistics',
        path: `/${RoutesPath.HOME}/${RoutesPath.USERS}/${RoutesPath.STATISTICS}`,
        icon: 'receipt',
        data: {
          roles: USERS_STATISTICS,
        },
        isContent: true,
      },
      {
        text: 'Agreements',
        path: `/${RoutesPath.HOME}/${RoutesPath.USERS}/${RoutesPath.AGREEMENTS_LIST}`,
        icon: 'receipt',
        data: {
          roles: USERS_AGREEMENTS,
        },
        isContent: true,
      },
    ]
  },
  {
    text: 'Documents',
    path: `/${RoutesPath.HOME}/${RoutesPath.DOCUMENTS}`,
    icon: 'receipt_long',
    isCollapsed: false,
    isActive: false,
    isClient: false,
    children: [
      {
        text: 'Receipts',
        path: `/${RoutesPath.HOME}/${RoutesPath.DOCUMENTS}/${RoutesPath.RECEIPTS}`,
        icon: 'receipt',
        data: {
          roles: DOCUMENTS_RECEIPTS
        },
        isContent: true,
      },
      {
        text: 'Daily Reports',
        path: `/${RoutesPath.HOME}/${RoutesPath.DOCUMENTS}/${RoutesPath.DAILY_REPORTS}`,
        icon: 'article',
        data: {
          roles: DOCUMENTS_DAILY_REPORTS
        },
        isContent: true,
      },
      {
        text: 'Monthly Reports',
        path: `/${RoutesPath.HOME}/${RoutesPath.DOCUMENTS}/${RoutesPath.MONTHLY_REPORTS}`,
        icon: 'assignment',
        data: {
          roles: DOCUMENTS_MONTHLY_REPORTS
        },
        isContent: true,
      },
      {
        text: 'Nonfiscal Documents',
        path: `/${RoutesPath.HOME}/${RoutesPath.DOCUMENTS}/${RoutesPath.NONFISCAL_DOCUMENTS}`,
        icon: 'assignment',
        data: {
          roles: DOCUMENTS_NONFISCAL_DOCUMENTS
        },
        isContent: true,
      },
      {
        text: 'Invoice To Receipts',
        path: `/${RoutesPath.HOME}/${RoutesPath.DOCUMENTS}/${RoutesPath.INVOICE_TO_RECEIPTS}`,
        icon: 'assignment',
        data: {
          roles: DOCUMENTS_INVOICE_TO_RECEIPTS
        },
        isContent: true,
      },
      {
        text: 'Canceled Receipts',
        path: `/${RoutesPath.HOME}/${RoutesPath.DOCUMENTS}/${RoutesPath.CANCELED_RECEIPTS}`,
        icon: 'assignment',
        data: {
          roles: DOCUMENTS_RECEIPTS_CANCEL
        },
        isContent: true,
      },
      {
        text: 'Statistics',
        path: `/${RoutesPath.HOME}/${RoutesPath.DOCUMENTS}/${RoutesPath.STATISTICS}`,
        icon: 'assignment',
        data: {
          roles: DOCUMENTS_STATISTICS
        },
        isContent: true,
      },
    ]
  },
  {
    text: 'Promotions',
    path: `/${RoutesPath.HOME}/${RoutesPath.PROMOTIONS}`,
    icon: 'sell',
    isCollapsed: false,
    isActive: false,
    isClient: false,
    children: [
      {
        text: 'Devices',
        path: `/${RoutesPath.HOME}/${RoutesPath.PROMOTIONS}/${RoutesPath.DEVICES}`,
        icon: 'receipt',
        data: {
          roles: PROMOTIONS_DEVICES
        },
        isContent: true,
      },
      {
        text: 'Promotions',
        path: `/${RoutesPath.HOME}/${RoutesPath.PROMOTIONS}/${RoutesPath.PROMOTIONS}`,
        icon: 'article',
        data: {
          roles: PROMOTIONS_PROMOTIONS
        },
        isContent: true,
      },
      {
        text: 'Promotions on devices',
        path: `/${RoutesPath.HOME}/${RoutesPath.PROMOTIONS}/${RoutesPath.PROMOTIONS_ON_DEVICES}`,
        icon: 'assignment',
        data: {
          roles: PROMOTIONS_PROMOTIONS_ON_DEVICES
        },
        isContent: true,
      },
    ]
  },
  {
    text: 'SAP Invoices',
    path: `/${RoutesPath.HOME}/${RoutesPath.SAP_INVOICES}`,
    icon: 'request_quote',
    isCollapsed: false,
    children: [
      {
        text: 'List',
        path: `/${RoutesPath.HOME}/${RoutesPath.SAP_INVOICES}/${RoutesPath.LIST}`,
        icon: 'receipt',
        data: {
          roles: SAP_INVOICES_LISTS
        },
        isContent: true,
      },
    ]
  },
  {
    text: 'Email',
    path: `/${RoutesPath.HOME}/${RoutesPath.EMAILS}`,
    icon: 'email',
    isCollapsed: false,
    isActive: false,
    isClient: false,
    children: [
      {
        text: 'List',
        path: `/${RoutesPath.HOME}/${RoutesPath.EMAILS}/${RoutesPath.LIST}`,
        icon: 'receipt',
        data: {
          roles: EMAILS_LIST
        },
        isContent: true,
      },
      {
        text: 'Templates',
        path: `/${RoutesPath.HOME}/${RoutesPath.EMAILS}/${RoutesPath.TEMPLATES}`,
        icon: 'receipt',
        data: {
          roles: EMAILS_TEMPLATES
        },
        isContent: true,
      },
    ]
  },
  {
    text: 'Services',
    path: `/${RoutesPath.HOME}/${RoutesPath.SERVICES}`,
    icon: 'manage_accounts',
    isCollapsed: false,
    isActive: false,
    isClient: false,
    children: [
      {
        text: 'Definitions',
        path: `/${RoutesPath.HOME}/${RoutesPath.SERVICES}/${RoutesPath.DEFINITIONS}`,
        icon: 'receipt',
        data: {
          roles: SERVICES_DEFINITION
        },
        isContent: true,
      },
      {
        text: 'Dashboard',
        path: `/${RoutesPath.HOME}/${RoutesPath.SERVICES}/${RoutesPath.DASHBOARD}`,
        icon: 'receipt',
        data: {
          roles: SERVICES_DEFINITION
        },
        isContent: true,
      },
      {
        text: 'Agreements',
        path: `/${RoutesPath.HOME}/${RoutesPath.SERVICES}/${RoutesPath.AGREEMENTS}`,
        icon: 'receipt',
        data: {
          roles: SERVICES_DEFINITION
        },
        isContent: true,
      },
      {
        text: 'Exclusions',
        path: `/${RoutesPath.HOME}/${RoutesPath.SERVICES}/${RoutesPath.EXCLUSIONS}`,
        icon: 'receipt',
        data: {
          roles: SERVICES_DEFINITION
        },
        isContent: true,
      },
      {
        text: 'Settings',
        path: `/${RoutesPath.HOME}/${RoutesPath.SERVICES}/${RoutesPath.SERVICES_SETTINGS}`,
        icon: 'receipt',
        data: {
          roles: SERVICES_DEFINITION
        },
        isContent: true,
      },
    ]
  },
  {
    text: 'Events',
    path: `/${RoutesPath.HOME}/${RoutesPath.EVENTS}`,
    icon: 'cloud_download',
    isCollapsed: false,
    isActive: false,
    isClient: false,
    children: [
      {
        text: 'List',
        path: `/${RoutesPath.HOME}/${RoutesPath.EVENTS}/${RoutesPath.LIST}`,
        icon: 'assessment',
        data: {
          roles: EVENTS_LIST,
        },
        isContent: true,
      },
      {
        text: 'Panel',
        path: `/${RoutesPath.HOME}/${RoutesPath.EVENTS}/${RoutesPath.PANEL}`,
        icon: 'receipt',
        data: {
          roles: EVENTS,
          somePermsAreFine: true,
        },
        isContent: true,
      },
      {
        text: 'Orders',
        path: `/${RoutesPath.HOME}/${RoutesPath.EVENTS}/${RoutesPath.ORDERS}`,
        icon: 'receipt',
        data: {
          roles: EVENTS,
          somePermsAreFine: true,
        },
        isContent: true,
      },
    ]
  },
  {
    text: 'Transactions',
    path: `/${RoutesPath.HOME}/${RoutesPath.TRANSACTIONS}`,
    icon: 'paid',
    isCollapsed: false,
    children: [
      {
        text: 'List',
        path: `/${RoutesPath.HOME}/${RoutesPath.TRANSACTIONS}/${RoutesPath.LIST}`,
        icon: 'receipt',
        data: {
          roles: TRANSACTIONS_LIST,
        },
        isContent: true,
      },
      {
        text: 'Devices',
        path: `/${RoutesPath.HOME}/${RoutesPath.TRANSACTIONS}/${RoutesPath.DEVICES}`,
        icon: 'receipt',
        data: {
          roles: TRANSACTIONS_DEVICES,
        },
        isContent: true,
      },
      {
        text: 'Hop&Shop Transactions',
        path: `/${RoutesPath.HOME}/${RoutesPath.TRANSACTIONS}/${RoutesPath.HOPSHOP_TRANSACTIONS}`,
        icon: 'receipt',
        data: {
          roles: TRANSACTIONS_HOPSHOP_TRANSACTIONS,
        },
        isContent: true,
      },
      {
        text: 'Hop&Shop Metrics',
        path: `/${RoutesPath.HOME}/${RoutesPath.TRANSACTIONS}/${RoutesPath.HOPSHOP_METRICS}`,
        icon: 'receipt',
        data: {
          roles: TRANSACTIONS_HOPSHOP_TRANSACTIONS,
        },
        isContent: true,
      },
      {
        text: 'Hop&Shop Devices',
        path: `/${RoutesPath.HOME}/${RoutesPath.TRANSACTIONS}/${RoutesPath.HOPSHOP_DEVICES}`,
        icon: 'receipt',
        data: {
          roles: TRANSACTIONS_HOPSHOP_DEVICES,
        },
        isContent: true,
      },
      {
        text: 'Hop&Shop Callbacks',
        path: `/${RoutesPath.HOME}/${RoutesPath.TRANSACTIONS}/${RoutesPath.HOPSHOP_CALLBACKS}`,
        icon: 'receipt',
        data: {
          roles: TRANSACTIONS_HOPSHOP_CALLBACKS,
        },
        isContent: true,
      },
      {
        text: 'Paytel Transactions',
        path: `/${RoutesPath.HOME}/${RoutesPath.TRANSACTIONS}/${RoutesPath.PAYTEL_TRANSACTIONS}`,
        icon: 'receipt',
        data: {
          roles: TRANSACTIONS_PAYTEL_TRANSACTIONS,
        },
        isContent: true,
      },
      {
        text: 'Paytel Metrics',
        path: `/${RoutesPath.HOME}/${RoutesPath.TRANSACTIONS}/${RoutesPath.PAYTEL_METRICS}`,
        icon: 'receipt',
        data: {
          roles: TRANSACTIONS_PAYTEL_TRANSACTIONS,
        },
        isContent: true,
      },
      {
        text: 'Paytel Devices',
        path: `/${RoutesPath.HOME}/${RoutesPath.TRANSACTIONS}/${RoutesPath.PAYTEL_DEVICES}`,
        icon: 'receipt',
        data: {
          roles: TRANSACTIONS_PAYTEL_DEVICES,
        },
        isContent: true,
      },
      {
        text: 'Paytel Reconciliations',
        path: `/${RoutesPath.HOME}/${RoutesPath.TRANSACTIONS}/${RoutesPath.PAYTEL_RECONCILIATIONS}`,
        icon: 'receipt',
        data: {
          roles: TRANSACTIONS_PAYTEL_DEVICES,
        },
        isContent: true,
      },
    ]
  },
  {
    text: 'Integrator',
    path: `/${RoutesPath.HOME}/${RoutesPath.INTEGRATOR}`,
    icon: 'man',
    isCollapsed: false,
    children: [
      {
        text: 'Dashboard',
        path: `/${RoutesPath.HOME}/${RoutesPath.INTEGRATOR}/${RoutesPath.DASHBOARD}`,
        icon: 'dashboard',
        data: {
          roles: INTEGRATOR_DASHBOARD,
        },
        isContent: true,
      },
      {
        text: 'Users',
        path: `/${RoutesPath.HOME}/${RoutesPath.INTEGRATOR}/${RoutesPath.USERS}`,
        icon: 'people',
        data: {
          roles: INTEGRATOR_USERS,
        },
        isContent: true,
      },
      {
        text: 'Billing',
        path: `/${RoutesPath.HOME}/${RoutesPath.INTEGRATOR}/${RoutesPath.BILLING}`,
        icon: 'receipt',
        data: {
          roles: INTEGRATOR_BILLING,
        },
        isContent: false,
      },
      {
        text: 'Orders',
        path: `/${RoutesPath.HOME}/${RoutesPath.INTEGRATOR}/${RoutesPath.ORDERS}`,
        icon: 'receipt',
        data: {
          roles: INTEGRATOR_ORDERS,
        },
        isContent: true,
      },
    ],
  },
  {
    text: 'Support',
    path: `/${RoutesPath.HOME}/${RoutesPath.SUPPORT}`,
    icon: 'help_center',
    isCollapsed: false,
    children: [
      {
        text: 'Feedback',
        path: `/${RoutesPath.HOME}/${RoutesPath.SUPPORT}/${RoutesPath.FEEDBACK}`,
        icon: 'receipt',
        data: {
          roles: SUPPORT_FEEDBACK
        },
        isContent: true,
      },
    ]
  },
  {
    text: 'Device Settings',
    path: `/${RoutesPath.HOME}/${RoutesPath.DEVICE_SETTINGS}`,
    icon: 'phonelink_setup',
    isCollapsed: false,
    isActive: false,
    isClient: false,
    children: [
      {
        text: 'Device List',
        path: `/${RoutesPath.HOME}/${RoutesPath.DEVICE_SETTINGS}/${RoutesPath.DEVICE_LIST}`,
        icon: 'receipt',
        data: {
          roles: DEVICE_SETTINGS_DEVICE_LIST
        },
        isContent: true,
      },
      {
        text: 'Service List',
        path: `/${RoutesPath.HOME}/${RoutesPath.DEVICE_SETTINGS}/${RoutesPath.SERVICE_LIST}`,
        icon: 'receipt',
        data: {
          roles: DEVICE_SETTINGS_SERVICE_LIST
        },
      },
    ]
  },
  {
    text: 'STX',
    path: `/${RoutesPath.HOME}/${RoutesPath.STX}`,
    icon: 'import_export',
    isCollapsed: false,
    isActive: false,
    isClient: false,
    children: [
      {
        text: 'Panel',
        path: `/${RoutesPath.HOME}/${RoutesPath.STX}/${RoutesPath.PANEL}`,
        icon: 'receipt',
        data: {
          roles: STX_CREATE_WEBSOCKET_SESSION
        },
        isContent: true,
      },
    ]
  },
  {
    text: 'Taxi',
    path: `/${RoutesPath.HOME}/${RoutesPath.TAXI}`,
    icon: 'taxi_alert',
    isCollapsed: false,
    isActive: false,
    isClient: false,
    children: [
      {
        text: 'Orders',
        path: `/${RoutesPath.HOME}/${RoutesPath.TAXI}/${RoutesPath.ORDERS}`,
        icon: 'receipt',
        data: {
          roles: TAXI_ORDERS_LIST
        },
        isContent: true,
      },
    ]
  },
  // { //TODO Odkomentować jak będą permissiony 
  //   text: 'Firmware Upgrade',
  //   path: `/${RoutesPath.HOME}/${RoutesPath.FIRMWARE_UPGRADE}`,
  //   icon: 'upgrade',
  //   isCollapsed: false,
  //   isActive: false,
  //   isClient: false,
  //   children: [
  //     {
  //       text: 'Firmware Versions',
  //       path: `/${RoutesPath.HOME}/${RoutesPath.FIRMWARE_UPGRADE}/${RoutesPath.FIRMWARE_VERSIONS}`,
  //       icon: 'receipt',
  //       data: {
  //         roles: FIRMWARE_VERSIONS,
  //       },
  //     },
  //     {
  //       text: 'Upload New Firmware',
  //       path: `/${RoutesPath.HOME}/${RoutesPath.FIRMWARE_UPGRADE}/${RoutesPath.UPLOAD_NEW_FIRMWARE}`,
  //       icon: 'receipt',
  //       data: {
  //         roles: UPLOAD_NEW_FIRMWARE,
  //       },
  //     },
  //   ]
  // },
];
