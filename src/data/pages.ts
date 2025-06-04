type Page = {
  name: string;
  url: `/${string}`
}
type Pages = Page[]

export const pages: Pages = [
  {
    name: 'Home',
    url: '/'
  },
  {
    name: 'About',
    url: '/about'
  },
  {
    name: 'Projects',
    url: '/projects'
  }
]