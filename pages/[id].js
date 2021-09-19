import Head from 'next/head';
import Link from 'next/link';
import { getAllIds, getData, getAKA } from '../lib/data';
import Layout from '../components/layout';

// make an instance of getStaticProps to return data for one person
export async function getStaticProps ({params}){

  const itemData = await getData(params.id);
  //retrieve AKA info
  const akaData = await getAKA(itemData.aka);


  return{
    props: {
      itemData,
      akaData
    }
  };
}

// make an instance of getStaticPaths function to get all possible URLs, async

//note the paths variable MUST USE THAT NAME otherwise it won't work
export async function getStaticPaths(){
  const paths = getAllIds();

  return{
    paths,
    fallback: false
  };
}

// make react component to display details about a person when dynamic route matches
//receives the entire value of itemData (a JSON object from array)
export default function Entry({itemData, akaData}){
  return (
    <Layout>
    <article className="card col-6">
      <div className="card-body">
        <h5 className="card-title">{itemData.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{itemData.phone}</h6>
        <p className="card-text">{itemData.birthdate}</p>
        <a href={'mailto:' + itemData.email} className="card-link">{itemData.email} </a>
        <p className="card-text">Also Known As: 
          <Link key={akaData.id} href={`/${akaData.id}`}>
            <a className="card-link">{akaData.name}</a>
          </Link>     
        </p>

        



      </div>
    </article>
    </Layout>
  );
}
