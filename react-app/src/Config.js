export default class Config {
    static api = process.env.NODE_ENV === 'development' ? 'http://devon-portfolio.local' : 'https://devon.shonirakhra.com/api'
}