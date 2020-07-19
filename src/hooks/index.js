import { useDispatch } from 'react-redux'
import { useEffect } from 'react';

export const useHandleScroll = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        dispatch({ type: 'LOAD_MORE' })
      }
    });
  }, [dispatch])

}
