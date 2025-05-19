import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useTodoApi = () => {
    const [todos, setTodos] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [formdata, setFormdata] = useState({
        title: '',
        description: ''
    });

    const handleData = (event: any) => {
        const { name, value } = event.target;
        setFormdata({
            ...formdata,
            [name]: value
        });
    };

    const fetchTodos = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/todos');
            setTodos(response.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);
            toast.error(`Failed to fetch todos: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const addNewTodo = async () => {
        try {
            if (!formdata.title.trim()) {
                toast.warning("Title is required");
                return;
            }
             if (!formdata.description.trim()) {
                toast.warning("Description is required");
                return;
            }

            await axios.post('http://localhost:3000/todos', formdata);
            await fetchTodos();
            setFormdata({
                title: '',
                description: ''
            });
            toast.success("Todo added successfully...");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to add todo';
            toast.error(errorMessage);
            throw error;
        }
    };

    const updateTodo = async (id: number) => {
        try {
            await axios.put(`http://localhost:3000/todos/${id}`, { completed: 1 });
            await fetchTodos();
            toast.success("Todo updated successfully...");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update todo';
            toast.error(errorMessage);
            throw error;
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/todos/${id}`);
            await fetchTodos();
            toast.success("Todo deleted successfully...");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to delete todo';
            toast.error(errorMessage);
            throw error;
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleTitleReset = ()=>{
        setFormdata({
            ...formdata, 
            title:''
        })
    }
        const handleDescReset = ()=>{
        setFormdata({
            ...formdata, 
            description:''
        })
    }

    return {
        todos,
        loading,
        error,
        refetch: fetchTodos,
        formdata,
        handleData,
        addNewTodo,
        updateTodo,
        deleteTodo,
        handleTitleReset,
        handleDescReset
        
    };
};

export default useTodoApi;