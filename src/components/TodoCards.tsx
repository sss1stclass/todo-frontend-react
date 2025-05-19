import { Box, Button, Card, CardContent, IconButton, Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import moment from 'moment';


const TodoCards = ({ items, deleteTodo, updateTodo }: any) => {
    return (
        <>
            <Card
                key={items?.id}
                sx={{
                    minWidth: {xs:300, sm:470},
                    position: 'relative',
                    mt: 2,
                    backgroundColor: items?.completed == 1 ? '#e8f5e9' : 'background.paper',
                    boxShadow: items?.completed == 1 ? '0px 2px 4px -1px rgba(76,175,80,0.2), 0px 4px 5px 0px rgba(76,175,80,0.14), 0px 1px 10px 0px rgba(76,175,80,0.12)' : 'primary',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: items?.completed == 1
                            ? '0px 5px 5px -3px rgba(76,175,80,0.2), 0px 8px 10px 1px rgba(76,175,80,0.14), 0px 3px 14px 2px rgba(76,175,80,0.12)'
                            : '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)'
                    }
                }}
            >
                <CardContent sx={{ height: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                textDecoration: items?.completed == 1 ? 'line-through' : 'none',
                                color: items?.completed == 1 ? 'text.secondary' : 'text.primary'
                            }}
                        >
                            {items.title || 'this is Title'}
                        </Typography>
                        <Tooltip title="Delete">
                        <IconButton onClick={() => deleteTodo(items?.id)} size="small" color="error">
                            <DeleteIcon />
                        </IconButton>
                        </Tooltip>
                    </Box>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        sx={{
                            textDecoration: items?.completed == 1 ? 'line-through' : 'none'
                        }}
                    >
                        {items.description || 'this is the descriptions of works'}
                    </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0, mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        size="small"
                        variant="outlined"
                        color="success"
                        disabled={items?.completed == 1}
                        endIcon={<DoneAllIcon />}
                        onClick={() => updateTodo(items?.id)}
                    >
                        {items?.completed == 1 ? 'Already Done' : 'Completed'}
                    </Button>
                    <Typography variant="caption">
                        {moment.utc(items?.created_at).local().format('LLL')}
                    </Typography>
                </Box>
            </Card>
        </>
    )
}

export default TodoCards