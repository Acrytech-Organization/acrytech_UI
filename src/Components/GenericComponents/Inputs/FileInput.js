import React from 'react'
import { useState } from 'react';
import { BiX } from 'react-icons/bi';
import { AllImageTypes, SchemaTypes } from '../../../Helpers/ExtraProperties';
import { megabytesToBytes, validateImageDimensions } from '../../../Helpers/helpers';

export default function FileInput({
    RestrictedSize,
    filetype,
    controlProps,
    props
}) {

    const [Error, setError] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    var showImage = selectedFile || props?.currentValue?.value?.Store?.Img;

    controlProps.onChange = (e) => {
        var Object = { name: props.data.item.name }
        if (props.data.item.type === SchemaTypes.file) {
            Object.value = e.target.files[0];
        } else if (props.data.item.type === SchemaTypes.IMAGE) {
            Object.value = {
                Store: {
                    Img: e.target.files[0],
                    type: SchemaTypes.IMAGE
                }
            };
        }
        props.onChange(Object);
    }

    const ValidateImage = async (e) => {
        setSelectedFile(null);
        setError("");

        if (e.target.value.length === 0) {
            props.deleteField(props.data.item.name);
            return;
        }
        const file = e.target.files[0];
        if (!(AllImageTypes.includes(file.type))) {
            setError("Please Enter the Valid Image of Png or Jpeg")
            return;
        }

        var DimensionVerify = true;

        if (props.data.item?.dimension) {

            let { width, height } = props.data.item?.dimension
            DimensionVerify = await validateImageDimensions(file, width, height)

            if (!DimensionVerify) {
                setError("Image Width and Height Mismatch!!");
                return;
            }

        }

        var ImageSize = megabytesToBytes(RestrictedSize);

        if (file?.size <= ImageSize) {
            setSelectedFile(URL.createObjectURL(file));
            controlProps.onChange(e);
        } else {
            setError("Image is too large. Please upload an image smaller than 1MB.");
            return;
        }
    }

    return (
        <div
            className={"hstack gap-2 flex-grow-1".concat(
                " " + props.data.className
            )}>
            <div className="flex-fill mb-4">
                <input
                    type={filetype}
                    accept={"image/png, image/jpeg"}
                    onChange={ValidateImage}
                    className={"form-control py-3"
                        .concat(" " + props.data.inputFieldClass)}
                    id={"floatingInput" + props.data.item.name}
                />

                <div className="invalid-feedback">
                    {props.data.item.helperText}
                </div>

                {Error !== "" ? <>
                    {Error}
                </> : <></>}

            </div>
            {!controlProps.required ? (
                <div className='d-flex'>
                    <button
                        type="button"
                        className="btn btn-lg btn-secondary mb-4"
                        onClick={() => {
                            setSelectedFile(null);
                            setError("")
                            props.deleteField(props.data.item.name);
                        }}
                    >
                        <BiX />
                    </button>
                </div>
            ) : (
                <></>
            )}

            {(showImage) && (
                <img src={showImage} alt="Uploaded"
                    className={"rounded "
                        + props.data.item.ImageClass} />
            )}

        </div>
    )
}
