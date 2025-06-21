import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import { ReviewCard } from './cards/ReviewCard'
import { Review } from '../interfaces/models'
import { Context } from '../store'
import { reviewClient } from '../clients'

export const ReviewContainer = observer(() => {
  const { room, user, review } = useContext(Context)

  const [isEdit, setIsEdit] = useState(false)
  const [current, setCurrent] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => reviewClient.loadAll(review, room), [])

  const resetEdit = () => {
    setContent('')
    setCurrent('')
    setIsEdit(false)
  }

  const submitChangeHandler = () =>
    reviewClient.change(content, current, review, user, resetEdit)

  const submitCreateHandler = () =>
    reviewClient.create(content, review, room, user, () => setContent(''))

  const changeHandler = (currentReview: Review) => {
    setIsEdit(true)
    setCurrent(currentReview._id)
    setContent(currentReview.content)
  }

  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        {review.reviews.length ? (
          review.reviews.map((r) => (
            <ReviewCard
              key={r._id}
              review={r}
              isOwner={user.isAuth && r.author === user.user.email}
              onChange={changeHandler}
              onDelete={(id: string) => reviewClient.delete(id, review)}
            />
          ))
        ) : (
          <Typography
            component="h5"
            variant="h5"
            sx={{ paddingBottom: 2, textAlign: 'center' }}
          >
            No reviews
          </Typography>
        )}
      </Box>
      <Divider />
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          py: 1,
          width: '100%',
          display: 'flex',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <TextField
          label="Review content"
          value={content}
          type="text"
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ m: '0 auto', height: '80%' }}
          onClick={isEdit ? submitChangeHandler : submitCreateHandler}
          disabled={!user.isAuth}
        >
          {isEdit ? 'Edit review' : 'Add review'}
        </Button>
      </Box>
    </>
  )
})
