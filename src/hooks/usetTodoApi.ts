import axios from "axios";
import { useEffect, useState } from "react";

const useTodoApi = () => {
    const [todos, setTodos] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [formdata, setFormdata] = useState({
        title: '',
        description: ''
    })
    const handleData = (event: any) => {
        const { name, value } = event.target;
        setFormdata({
            ...formdata,
            [name]: value
        })
    }

    const fetchTodos = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/todos');
            setTodos(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const addNewTodo = async () => {
        try {
            const response = await axios.post('http://localhost:3000/todos', formdata);
            await fetchTodos();
            setFormdata({
                title: '',
                description: ''
            })

        } catch (error) {
            console.error('Error adding todo:', error);
            throw error;
        }
    };
    const updateTodo = async (id: number) => {
        try {
            const response = await axios.put(`http://localhost:3000/todos/${id}`, {completed:1});
             await fetchTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
            throw error;
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/todos/${id}`);
            await fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);
    console.log(formdata)

    return {
        todos,
        loading,
        error,
        refetch: fetchTodos,
        formdata,
        handleData,
        addNewTodo,
        updateTodo,
        deleteTodo
    };
};

export default useTodoApi;