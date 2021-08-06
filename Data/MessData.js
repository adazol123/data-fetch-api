const fetch = require("node-fetch");

async function MessData(url) {
    console.log("fetching data from ", url);
    let fetchs = await fetch(url);
    let result = await fetchs.json();
    let { status, data } = result;
    let output = data.map((coin) => ({
        id: coin.slug,
        symbol: coin.symbol,
        name: coin.name,
        image_url: {
        small: `https://messari.io/asset-images/${coin.id}/64.png?v=2`,
        medium: `https://messari.io/asset-images/${coin.id}/128.png?v=2`,
        chart: `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=php&days=7`
        },
        profile: {
        tagline: coin.profile.tagline,
        overview: coin.profile.overview,
        token_details: {
            category: coin.profile.category
            ? coin.profile.category
            : coin.metrics.misc_data.categories,
            sector: coin.profile.sector
            ? coin.profile.sector
            : coin.metrics.misc_data.sectors,
            consensus_algorithm: coin.profile.consensus_algorithm,
            usage: coin.profile.token_details.usage,
            type: coin.profile.token_details.type,
            emission_general: coin.profile.token_details.emission_type_general,
            max_supply: coin.profile.token_details.max_supply
            ? coin.profile.token_details.max_supply
            : coin.profile.token_distribution.max_supply,
            current_supply: coin.profile.token_distribution.current_supply,
            circulating_supply: coin.metrics.supply.circulating,
            addresses_count: coin.metrics.on_chain_data.addresses_count,
            active_addresses: coin.metrics.on_chain_data.active_addresses,
            active_addresses_received_count:
            coin.metrics.on_chain_data.active_addresses_received_count,
            active_addresses_sent_count:
            coin.metrics.on_chain_data.active_addresses_sent_count,
            asset_created_at: coin.metrics.misc_data.asset_created_at,
        },
        relevant_resources: coin.profile.relevant_resources,
        staking_stats: {
            staking_yield_percent: coin.metrics.staking_stats.staking_yield_percent,
            staking_type: coin.metrics.staking_stats.staking_type,
            staking_minimum: coin.metrics.staking_stats.staking_minimum,
            real_staking_yield_percent:
            coin.metrics.staking_stats.real_staking_yield_percent,
        },
        market_data: {
            marketcap_rank: coin.metrics.marketcap.rank,
            marketcap_dominance_percent:
            coin.metrics.marketcap.marketcap_dominance_percent,
            current_marketcap_usd: coin.metrics.marketcap.current_marketcap_usd,
            liquid_marketcap_usd: coin.metrics.marketcap.liquid_marketcap_usd,
            realized_marketcap_usd: coin.metrics.marketcap.realized_marketcap_usd,
            outstanding_marketcap_usd:
            coin.metrics.marketcap.outstanding_marketcap_usd,
            price_usd: coin.metrics.market_data.price_usd,
            price_btc: coin.metrics.market_data.price_btc,
            price_eth: coin.metrics.market_data.price_eth,
        },
        },
    }));
    console.log(data)
    return output;    
}

module.exports = MessData