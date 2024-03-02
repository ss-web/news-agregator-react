import React from 'react';
import NewsAPICard from './cards/NewsAPICard';
import GuardianCard from './cards/GuardianCard';
import NYtimesCard from './cards/NYtimesCard';
import { NEWS_API, GUARD_API, NY_API, UNICAL_KEY } from '../constants';
import Card from './cards/Card';

const ArticleList = ({ articles }) => {
  return (
    <section className="articles">
      {articles.map((article, index) => (
        <Card
          key={index}
          context={<>
            {article[UNICAL_KEY] === NEWS_API && <NewsAPICard article={article} />}
            {article[UNICAL_KEY] === GUARD_API && <GuardianCard article={article} />}
            {article[UNICAL_KEY] === NY_API && <NYtimesCard article={article} />}
          </>}
          source={article[UNICAL_KEY]}
          readMore={
            article[UNICAL_KEY] === NEWS_API && article.url ||
            article[UNICAL_KEY] === GUARD_API && article.webUrl ||
            article[UNICAL_KEY] === NY_API && (article.url || article.web_url)
          } 
        />
      ))}
    </section>
  );
};

export default ArticleList;
