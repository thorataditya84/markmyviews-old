const categories = [
  {
    title: "Editor's Picks",
    img: 'public/images/Editor.jpg',
    hreflink: '/editor-picks'
  },
  {
    title: 'Most Popular',
    img: 'public/images/most.jpg',
    hreflink: '/most-popular'
  },
  {
    title: 'Academic & Education',
    img: 'public/images/academic.jpg',
    hreflink: '/Academic&Education'
  },
  {
    title: 'Art',
    img: 'public/images/art.jpg',
    hreflink: '/art'
  },
  {
    title: 'Biography',
    img: 'public/images/biography.jpg',
    hreflink: 'biography'
  },
  {
    title: 'Business & Career',
    img: 'public/images/business.jpg',
    hreflink: 'Business&Career'
  },
  {
    title: 'Environment',
    img: 'public/images/env.jpg',
    hreflink: 'Environment'
  },
  {
    title: 'Health & Fitness',
    img: 'public/images/health.jpg',
    hreflink: 'Health&Fitness'
  },
  {
    title: 'Technology',
    img: 'public/images/tech.jpg',
    hreflink: 'Technology'
  },
  {
    title: 'Science & Research',
    img: 'public/images/science.jpg',
    hreflink: 'Science&Research'
  }
]
document.getElementById('main_container').innerHTML = ''
categories.map(element => {
  document.getElementById('main_container').innerHTML += `
  <a class="card" style="width: 10rem" href=${element.hreflink}>
  <img src=${element.img} class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">${element.title}</h5>
  </div>
</a>
`
})
