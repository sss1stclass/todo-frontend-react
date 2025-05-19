import usetTodoApi from '../hooks/usetTodoApi'
import { Box, Button, CircularProgress, Divider, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import AddTaskIcon from '@mui/icons-material/AddTask';
// import EditIcon from '@mui/icons-material/Edit';
import TodoCards from './TodoCards';
const Todo = () => {
    const {
        todos,
        loading,
        formdata,
        handleData,
        addNewTodo,
        updateTodo,
        deleteTodo,
        handleTitleReset,
        handleDescReset
    } = usetTodoApi();

    console.log(loading, 'alsdfj')

    return (
        <Box>
            <Typography variant='h3' textAlign='center' fontWeight='600' marginBottom='1px'>Todo App</Typography>
            <Typography variant="overline" gutterBottom sx={{ display: { xs: 'none', sm: 'block' } }} textAlign='center' marginLeft='300px' marginTop='1px'>A simplified way to handle and track your task</Typography>
            <Divider />
            <Box mt={2}>
                <Paper
                    elevation={3}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        padding: 20,
                        margin: '0 auto',
                        alignItems: 'center',
                    }}
                    sx={{ width: { xs: '80%', sm: '60%' } }}
                >
                    <TextField
                        id="outlined-basic"
                        label="Title"
                        name='title'
                        variant="outlined"
                        value={formdata?.title}
                        onChange={handleData}
                        placeholder="Add your todo here..."
                        sx={{ width: '100%' }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => handleTitleReset()}>
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        multiline
                        id="filled-basic"
                        label="Description"
                        variant="filled"
                        name='description'
                        value={formdata?.description}
                        onChange={handleData}
                        placeholder="Add your todo description here..."
                        sx={{ width: '100%' }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => handleDescReset()}>
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button onClick={() => addNewTodo()} variant="outlined" color='secondary' endIcon={<AddTaskIcon />}>
                        Add Task
                    </Button>
                </Paper>
            </Box>
            {
                loading ? (
                    <Box
                        p={2}
                        mt={1}
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <CircularProgress color="inherit" />
                        <Typography>Data is Loading...</Typography>
                    </Box>)
                    :
                    <Box
                        p={2}
                        mt={1}
                    // uncomment this sx prop to view the cards in grid style type, By default it is in list type...
                    // sx={{ display: 'flex', justifyContent: 'start', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}
                    >
                        {todos?.map((items: any) => (
                            <TodoCards
                                key={items?.id}
                                items={items}
                                deleteTodo={deleteTodo}
                                updateTodo={updateTodo}
                            />
                        ))}
                    </Box>
            }
        </Box>
    )
}

export default Todo