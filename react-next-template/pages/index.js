import { END } from 'redux-saga';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import HomeContainer from '../containers/Home/HomeContainer';


const Home = () => {
  const dispatch = useDispatch();

  return (
      <HomeContainer />
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      const cookie = req ? req.headers.cookie : '';
      axios.defaults.headers.Cookie = '';
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      // store.dispatch({
      //   type: LOAD_MY_INFO_REQUEST,
      // });
      // store.dispatch({
      //   type: LOAD_POSTS_REQUEST,
      // });
      // console.log('serverside');
      store.dispatch(END);
      await store.sagaTask.toPromise();
    });

export default Home;