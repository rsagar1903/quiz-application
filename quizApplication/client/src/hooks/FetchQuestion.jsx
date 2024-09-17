import { useEffect, useState } from "react"
import {useDispatch} from "react-redux"
// import data , {answers} from "../database/data"
import { getServerData } from "../helper/helper"
import * as Action from "../redux/question_reducer"

export const useFetchQestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({ isLoading : false, apiData : [], serverError: null});

    useEffect(() => {
        setGetData(prev => ({...prev, isLoading : true}));

        /** async function fetch backend data */
        (async () => {
            try {
                // let questions = await data;
                const [{ questions, answers }] = await getServerData(`http://localhost:5000/api/questions`, (data) => data)
                if(questions.length > 0){
                    setGetData(prev => ({...prev, isLoading : false}));
                    setGetData(prev => ({...prev, apiData : {questions,answers}}));

                    /** dispatch an action */
                    dispatch(Action.startExamAction({ question : questions, answers }))

                } else{
                    throw new Error("No Question Avalibale");
                }
            } catch (error) {
                setGetData(prev => ({...prev, isLoading : false}));
                setGetData(prev => ({...prev, serverError : error}));
            }
        })();
    }, [dispatch]);

    return [getData, setGetData];
}

export const MoveNextQuestion = () => async(dispatch) =>{
    try {
        dispatch(Action.moveNextAction());
    } catch (error) {
        console.log(error);
    }
}
export const MovePrevQuestion = () => async(dispatch) =>{
    try {
        dispatch(Action.movePrevAction());
    } catch (error) {
        console.log(error);
    }
}