import '../static/styles/components/LinkCatalog.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LinkAccordion from './LinkAccordion';

const articles = [
  {
    name: "Politics of ChatGPT",
    description: "Great article done on the political sentiment of the AI tool ChatGPT. The author used some standard political sentiment quizzes to check the AI's alignment and offered great visualizations to demonstrate it's change over time.",
    url: "https://davidrozado.substack.com/p/chatgpt"
  },
  {
    name: "Tao of Node",
    description: "Opinionated piece with some interesting and useful insights on Node Best Practices.",
    url: "https://alexkondov.com/tao-of-node/"
  },
  {
    name: "2022 Most Popular Node Frameworks",
    description: "Overview of the most commonly used frameworks in Node apps pulled from a variety of dev surveys.",
    url: "https://stackdiary.com/node-js-frameworks/"
  },
  {
    name: "Dr. Werner Vogels Keynote",
    description: "Dr. Werner Vogels AWS Re:Invent kyenote covering interesting architecture patterns and technologies.",
    url: "https://www.youtube.com/watch?v=RfvL_423a-I"
  },
];

const tools = [
  {
    name: "Vs Code Dev Containers",
    description: "An awesome new extension in Vs Code that allows developers to associate dvelopment containers with their code. Greatly reduces start up costs for new team members.",
    url: "https://code.visualstudio.com/docs/devcontainers/containers"
  },
  {
    name: "react-gh-pages",
    description: "An easy to use framework for deploying React apps to GitHub pages.",
    url: "https://github.com/gitname/react-gh-pages"
  },
  {
    name: "Coolors",
    description: "Color palette generator for websites.",
    url: "https://coolors.co/"
  },
  {
    name: "Purecss",
    description: "Simple, compact CSS modules for use in new projects.",
    url: "https://purecss.io/"
  },
  {
    name: "Docker-OSX",
    description: "A containerized version of Mac OSX.",
    url: "https://github.com/sickcodes/Docker-OSX"
  }
];

const news = [
  {
    name: "Node Weekly Newsletter",
    description: "Newsletter I use to keep up with Node framework changes.",
    url: "https://nodeweekly.com/"
  },
  {
    name: "React Weekly Newsletter",
    description: "Newsletter I use to keep up with React framework changes.",
    url: "https://react.statuscode.com/"
  },
  {
    name: "TLDR Weekly Newsletter",
    description: "Software engineering newsletter I use to keep up with the indurstry.",
    url: "https://tldr.tech/"
  },
  {
    name: "O'Reilly Radar Trends to Watch Newsletter",
    description: "Software engineering newsletter I use to keep up with the indurstry.",
    url: "https://www.oreilly.com/emails/newsletters/"
  },
  {
    name: "Programming Subreddit",
    description: "Forum for developers to post interesting topics and articles.",
    url: "https://www.reddit.com/r/programming/"
  },
  {
    name: "Programming Humor Subreddit",
    description: "Forum for developers to post the latest and greatest memes and technology jokes. Great for a good laugh!",
    url: "https://www.reddit.com/r/ProgrammerHumor/"
  }
]

function LinkCatalog() {
  return (
    <div className='link-catalog-wrapper'>
      <h3 className='link-header'>
        Favorite Tools
      </h3>
      <LinkAccordion links={tools}/>
      <h3 style={{ paddingTop: "15px" }} className='link-header'>
        Tech News Sources
      </h3>
      <LinkAccordion links={news}/>
      <h3 style={{ paddingTop: "15px" }} className='link-header'>
        Interesting Articles
      </h3>
      <LinkAccordion links={articles}/>
    </div>
  );
}

export default LinkCatalog; 