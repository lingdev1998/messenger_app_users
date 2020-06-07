
import React, { useEffect, useState } from 'react';
import './GroupList.css'

export const GroupTypeList = (props) => {
    const [listType,setListType] = useState([]);
    useEffect(()=>{
        setListType(props.listType);
    },[props.listType]);
    return (
        <>
        <div className="row" style={{ padding: "30px" }}>
        <div className="col-12">
          <div class="widget widget_ask row form">
            <button className="btn btn-primary" onClick={() => props.setCreateGroupIsShow(true)} style={{ width: "100%" }}>Tạo Nhóm Mới</button>
          </div>
        </div>
      </div>
        <div className="row" style={{padding:"30px"}}>
            <div className="col-12">
                <form className="form">
                    <h2>Lọc</h2>
                    <div className="inputGroup">
                        <input id="radio1" key="radio1" name="listType" type="radio" value = "getAllGroups" checked={props.currentRangeRadio === "getAllGroups"} onChange={e => props.handleChangeRangeRadio(e)} />
                        <label htmlFor="radio1">Tất Cả</label>
                    </div>
                    <div className="inputGroup">
                        <input id="radio2" key="radio2" name="radio" type="radio" value = "getAllGroupJoined"  checked={props.currentRangeRadio === "getAllGroupJoined"} onChange={e => props.handleChangeRangeRadio(e)} />
                        <label htmlFor="radio2">Đã Tham Gia</label>
                    </div>
                    <h2>Loại <input key="option0" id="option0" name="option0" type="checkbox" checked={props.checkAllStatus} value="checkAll" onClick={e => props.handleAllChecked(e)} /></h2>
 
                    {
                        listType.map(item =>
                            item !== undefined ?
                                <div className="inputGroup">
                                    <input key={"option" + item.id} id={"option" + item.id}  value={item.id} checked={item.isChecked} name="option2" type="checkbox" onClick={e => props.handleCheckBoxChangeStatus(e)} />
                                    <label htmlFor={"option" + item.id}>{item.typeName}</label>
                                </div> : ""
                        )
                    }
                </form>
            </div>
        </div>
        </>
    );
}

export default GroupTypeList;