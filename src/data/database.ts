import type { DbTable } from '../types/docs'

export const dbTables: DbTable[] = [
  {
    name: 'app_profile_history',
    purpose: 'Table \`app_profile_history\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'bank_accounts',
    purpose: 'Finance bank accounts.',
    todoVerify: false,
  },
  {
    name: 'bank_accounts_permissions',
    purpose: 'Table \`bank_accounts_permissions\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'bank_accounts_transactions',
    purpose: 'Table \`bank_accounts_transactions\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'bans',
    purpose: 'Player bans.',
    todoVerify: false,
  },
  {
    name: 'bench_schematics',
    purpose: 'Table \`bench_schematics\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'billboards',
    purpose: 'Table \`billboards\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'blueline_race_history',
    purpose: 'Table \`blueline_race_history\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'blueline_track_history',
    purpose: 'Table \`blueline_track_history\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'blueline_tracks',
    purpose: 'Table \`blueline_tracks\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'business_configs',
    purpose: 'Table \`business_configs\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'business_documents',
    purpose: 'Table \`business_documents\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'business_notices',
    purpose: 'Table \`business_notices\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'business_phones',
    purpose: 'Table \`business_phones\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'business_receipts',
    purpose: 'Table \`business_receipts\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'business_tvs',
    purpose: 'Table \`business_tvs\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'casino_bigwins',
    purpose: 'Table \`casino_bigwins\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'casino_config',
    purpose: 'Table \`casino_config\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'casino_statistics',
    purpose: 'Table \`casino_statistics\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'changelogs',
    purpose: 'Table \`changelogs\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'character_app_profiles',
    purpose: 'Table \`character_app_profiles\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'character_calls',
    purpose: 'Table \`character_calls\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'character_chatter_groups',
    purpose: 'Table \`character_chatter_groups\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'character_contacts',
    purpose: 'Table \`character_contacts\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'character_documents',
    purpose: 'Table \`character_documents\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'character_documents_shared',
    purpose: 'Table \`character_documents_shared\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'character_emails',
    purpose: 'Table \`character_emails\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'character_messages',
    purpose: 'Table \`character_messages\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'character_parole',
    purpose: 'Table \`character_parole\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'character_photos',
    purpose: 'Table \`character_photos\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'character_schematics',
    purpose: 'Table \`character_schematics\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'characters',
    purpose: 'Primary character rows (appearance, cash, jobs JSON, etc.).',
    todoVerify: false,
  },
  {
    name: 'chatter_groups',
    purpose: 'Table \`chatter_groups\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'chatter_messages',
    purpose: 'Table \`chatter_messages\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'crafting_cooldowns',
    purpose: 'Table \`crafting_cooldowns\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'dealer_data',
    purpose: 'Table \`dealer_data\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'dealer_records',
    purpose: 'Table \`dealer_records\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'dealer_records_buybacks',
    purpose: 'Table \`dealer_records_buybacks\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'dealer_showrooms',
    purpose: 'Table \`dealer_showrooms\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'dealer_stock',
    purpose: 'Table \`dealer_stock\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'donator_items',
    purpose: 'Table \`donator_items\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'donator_plates',
    purpose: 'Table \`donator_plates\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'donator_vehicles',
    purpose: 'Table \`donator_vehicles\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'donor_created_item',
    purpose: 'Table \`donor_created_item\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'firearms',
    purpose: 'Table \`firearms\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'firearms_flags',
    purpose: 'Table \`firearms_flags\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'firearms_projectiles',
    purpose: 'Table \`firearms_projectiles\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'jobs',
    purpose: 'Job definitions / workforce data.',
    todoVerify: false,
  },
  {
    name: 'loans',
    purpose: 'Table \`loans\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'loans_credit_scores',
    purpose: 'Table \`loans_credit_scores\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'logs',
    purpose: 'Framework log storage.',
    todoVerify: false,
  },
  {
    name: 'mdt_charges',
    purpose: 'Table \`mdt_charges\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'mdt_library',
    purpose: 'Table \`mdt_library\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'mdt_notices',
    purpose: 'Table \`mdt_notices\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'mdt_reports',
    purpose: 'Table \`mdt_reports\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'mdt_reports_evidence',
    purpose: 'Table \`mdt_reports_evidence\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'mdt_reports_people',
    purpose: 'Table \`mdt_reports_people\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'mdt_warrants',
    purpose: 'Table \`mdt_warrants\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'meth_tables',
    purpose: 'Table \`meth_tables\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'moonshine_barrels',
    purpose: 'Table \`moonshine_barrels\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'moonshine_stills',
    purpose: 'Table \`moonshine_stills\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'ox_doorlock',
    purpose: 'Door lock definitions for ox_doorlock.',
    todoVerify: false,
  },
  {
    name: 'peds',
    purpose: 'Table \`peds\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'placed_meth_tables',
    purpose: 'Table \`placed_meth_tables\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'placed_moonshine_barrels',
    purpose: 'Table \`placed_moonshine_barrels\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'placed_moonshine_stills',
    purpose: 'Table \`placed_moonshine_stills\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'placed_props',
    purpose: 'Table \`placed_props\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'properties',
    purpose: 'Ownable properties.',
    todoVerify: false,
  },
  {
    name: 'properties_furniture',
    purpose: 'Table \`properties_furniture\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'redline_race_history',
    purpose: 'Table \`redline_race_history\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'redline_racer_history',
    purpose: 'Table \`redline_racer_history\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'redline_track_history',
    purpose: 'Table \`redline_track_history\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'redline_tracks',
    purpose: 'Table \`redline_tracks\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'scenes',
    purpose: 'Table \`scenes\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'sequence',
    purpose: 'Server sequence counters.',
    todoVerify: false,
  },
  {
    name: 'shop_bank_accounts',
    purpose: 'Table \`shop_bank_accounts\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'storage_units',
    purpose: 'Table \`storage_units\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'tokens',
    purpose: 'Auth / queue tokens.',
    todoVerify: false,
  },
  {
    name: 'vehicles',
    purpose: 'Owned vehicle persistence.',
    todoVerify: false,
  },
  {
    name: 'weed',
    purpose: 'Table \`weed\` from database.sql.',
    todoVerify: true,
  },
  {
    name: 'whitelisted_peds',
    purpose: 'Table \`whitelisted_peds\` from database.sql.',
    todoVerify: true,
  }
]
