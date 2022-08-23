export default class Config {
    static api = process.env.NODE_ENV === 'development' ? 'http://devon-portfolio.local' : 'https://devon.shonirakhra.com/api'
    static token_key = 'devon_portfolio_token';
}