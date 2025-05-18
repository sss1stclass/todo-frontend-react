import usetTodoApi from '../hooks/usetTodoApi'
import { Box, Button, Card, CardActionArea, CardContent, Divider, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import AddTaskIcon from '@mui/icons-material/AddTask';
// import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';
const Todo = () => {
    const {
        getAllData,
    } = usetTodoApi();
    console.log(getAllData)

    return (
        <Box>
            <Typography variant='h2' textAlign='center' fontWeight='600' marginBottom='1px'>Todo App</Typography>
            <Typography variant="overline" gutterBottom sx={{ display: 'block' }} textAlign='center' marginLeft='300px' marginTop='1px'>A simplified way to handle ans track your task</Typography>
            <Divider />
            <Box mt={2}>
                <Paper
                    elevation={3}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        padding: 20,
                        width: '50%',
                        margin: '0 auto',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        placeholder="Add your todo here..."
                        sx={{ width: '100%' }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => alert('Icon clicked')}>
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
                        placeholder="Add your todo description here..."
                        sx={{ width: '100%' }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => alert('Icon clicked')}>
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button variant="outlined" color='secondary' endIcon={<AddTaskIcon />}>
                        Add Task
                    </Button>
                </Paper>
            </Box>
            <Box p={2} mt={1}>
                {getAllData.map((items: any, index: number) => (
                    <Card key={index} sx={{ minWidth: 275, position: 'relative', mt: 2 }}>
                        <CardActionArea>
                            <CardContent sx={{ height: '100%'}}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h5" component="div">
                                        {items.title || 'ajdfldfsjsdkf'}
                                    </Typography>
                                    <IconButton size="small" color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>

                                <Typography variant="body2" color="text.secondary" noWrap>
                                    {items.description || 'This is the descriptionsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <Box sx={{ p: 2, pt: 0, mt: 1 }}>
                            <Button
                                size="small"
                                variant="outlined"
                                color="success"
                                endIcon={<DoneAllIcon />}
                            //   onClick={() => handleMarkAsCompleted(items)}
                            >
                                Completed
                            </Button>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box>
    )
}

export default Todo