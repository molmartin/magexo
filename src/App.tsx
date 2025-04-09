import { gql, useQuery } from '@apollo/client';
import CategoryList from './CategoryList';

const App = () => {
  const GET_SCHEMA = gql`
    {
      __schema {
        types {
          name
          fields {
            name
            type {
              name
            }
          }
        }
      }
    }
  `;

  const { data } = useQuery(GET_SCHEMA);

  console.log(data);

  /*  console.log(
    data.types?.find((type) => type.name.toLowerCase().includes('categ')),
  ); */

  return (
    <div>
      <h1>Product Catalog</h1>

      {/* Zobrazíme seznam kategorií */}
      <CategoryList />
    </div>
  );
};

export default App;
