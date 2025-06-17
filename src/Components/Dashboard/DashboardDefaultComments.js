import dayjs from "dayjs"
import { INPUT_TYPE_NONE, SchemaTypes } from "../../Helpers/ExtraProperties"
import { addDaysToToday } from "../../Helpers/helpers"
import { Box, TextField, Typography } from "@mui/material"
import StaticDropDown from "../GenericComponents/DropDown/StaticDropDown"
import { useState } from "react"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import GenericDatePicker from "../GenericComponents/Date/GenericDatePicker"

export const DashboardDefaultComments = (
    {
        setComment,
        setSelectedDate,
        comment,
        dropDownList,
        getOptionLabel,
        formName,
        currentValue,
        selectedDate
    }) => {

    const [followUp, setFollowUp] = useState(currentValue)

    const showCommentBox = followUp?.showCommentBox

    const followUpPropertyList = {
        data: {
            item: {
                displayName: "Select Comments",
                name: 'followUp',
                required: true,
                type: SchemaTypes.STATICDROPDOWN,
                dropDownList: dropDownList,
            },
            inputMode: INPUT_TYPE_NONE,
        },
        gridSizes: {
            lg: 6
        },
        onChange: (e) => {
            if (e.value) {
                setFollowUp(e.value)
                setComment(e.value)
                if (setSelectedDate) {
                    let utc = addDaysToToday(e.value.days).toUTCString()
                    let customDate = dayjs(utc)
                    setSelectedDate(customDate)
                }
            }
        }
    }

    return (
        <Grid2 container width={"100%"}>

            <Grid2 xs={12}>
                <Typography component="div" className='fw-bolder mb-2'>{formName}</Typography>
            </Grid2>

            <Grid2 xs={12}>
                <Box>
                    <Grid2 container alignItems={"flex-end"}>
                        <Grid2 xs={12} md>
                            <StaticDropDown
                                getOptionLabel={(option) => getOptionLabel(option)}
                                currentValue={followUp}
                                props={followUpPropertyList}
                                gridSizes={followUpPropertyList.data.gridSizes}
                                isOptionEqualToValue={(option, value) => option.label === value.label}
                            />
                        </Grid2>

                        {
                            selectedDate &&
                            <Grid2 xs={12} md={4}>
                                <GenericDatePicker
                                    value={selectedDate}
                                    setValue={setSelectedDate} />
                            </Grid2>
                        }
                    </Grid2>
                </Box>
            </Grid2>

            {
                showCommentBox &&
                <Grid2 xs={12}>
                    <TextField
                        inputProps={{
                            className: "form-control",
                            required: true
                        }}
                        onChange={(e) => setComment(prev => ({ ...prev, message: e.target.value }))}
                        fullWidth
                        multiline
                        rows={3}
                        value={comment?.message}
                        placeholder='Please Type Comment...'
                    />
                </Grid2>
            }
        </Grid2>
    )
}