// main
import React, { useState, useEffect } from "react";
import axios from "axios";
import "styles/form.scss";
import { Toast, Grid } from "antd-mobile";

const apiUrl = process.env.REACT_APP_API_URL;

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement;
//   },
//   ref: React.Ref<unknown>
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export default function FullScreenDialog(props: {
  type: number;
  closeModel: any;
  getList: any;
  curRow: any;
}) {
  const [member, setMember] = useState({
    id: "",
    name: "",
    nickname: "",
    sex: "1",
    birthday: "",
    life: "1",
    zodiac: "",
    constellation: "",
    occupation: "",
    interest: "",
    contact: "",
    intro: "",
  });

  // 关闭弹窗
  const handleClose = () => {
    props.closeModel();
  };

  // 保存信息
  const handleSave = (e: any) => {
    e.preventDefault();
    console.log(member, "member");
    // setMember({ ...member, id: props.curRow.id })
    // 有 id 新增，无 id 修改

    // 新增 | 修改 接口
    axios
      .post(`${apiUrl}/member/save`, member)
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          Toast.show({ icon: "success", content: res.msg });
          handleClose();
          props.getList();
        } else {
          Toast.show({ icon: "fail", content: res.msg });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(member, "member22");
    // 修改进行赋值
    if (props.type === 2) {
      console.log(props.curRow, "props.curRow");
      setMember({ ...props.curRow });
    }
  }, [props]);

  return (
    <div className="g-dialog">
      {/* header */}
      <h3 className="title">
        <div className="left"></div>
        <div className="name">
          {props.type === 1
            ? "载入成员"
            : props.type === 2
            ? "修改成员信息"
            : ""}
        </div>
        <div className="right"></div>
      </h3>
      {/* 弹窗内容 */}
      <form className="form-main-box">
        <div className="form-group">
          <label>尊姓大名</label>
          <input
            name="name"
            type="text"
            value={member.name}
            required
            onChange={(e) => setMember({ ...member, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>别号</label>
          <input
            name="nickname"
            type="text"
            value={member.nickname}
            onChange={(e) => setMember({ ...member, nickname: e.target.value })}
          />
        </div>
        <Grid columns={2} gap={10}>
          <Grid.Item>
            <div className="form-group">
              <label>男女</label>
              <select
                name="sex"
                value={member.sex}
                onChange={(e) => setMember({ ...member, sex: e.target.value })}
              >
                <option value="1">男</option>
                <option value="0">女</option>
              </select>
            </div>
          </Grid.Item>
          <Grid.Item>
            <div className="form-group">
              <label>生死</label>
              <select
                name="life"
                value={member.life}
                onChange={(e) => setMember({ ...member, life: e.target.value })}
              >
                <option value="1">生</option>
                <option value="0">死</option>
              </select>
            </div>
          </Grid.Item>
        </Grid>
        {/* 生日 */}
        <div className="form-group">
          <label>生辰</label>
          <input
            type="date"
            value={member.birthday}
            onChange={(e) =>
              setMember({
                ...member,
                birthday: e.target.value.substring(0, 10),
              })
            }
          />
        </div>

        <Grid columns={2} gap={10}>
          <Grid.Item>
            <div className="form-group">
              <label>生肖</label>
              <select
                name="zodiac"
                value={member.zodiac}
                onChange={(e) =>
                  setMember({ ...member, zodiac: e.target.value })
                }
              >
                <option value="鼠">子（鼠）</option>
                <option value="牛">丑（牛）</option>
                <option value="虎">寅（虎）</option>
                <option value="兔">卯（兔）</option>
                <option value="龙">辰（龙）</option>
                <option value="蛇">巳（蛇）</option>
                <option value="马">午（马）</option>
                <option value="羊">未（羊）</option>
                <option value="猴">申（猴）</option>
                <option value="鸡">酉（鸡）</option>
                <option value="狗">戌（狗）</option>
                <option value="猪">亥（猪）</option>
              </select>
            </div>
          </Grid.Item>
          <Grid.Item>
            <div className="form-group">
              <label>星座</label>
              <select
                name="constellation"
                value={member.constellation}
                onChange={(e) =>
                  setMember({ ...member, constellation: e.target.value })
                }
              >
                <option value="白羊座">白羊座</option>
                <option value="金牛座">金牛座</option>
                <option value="双子座">双子座</option>
                <option value="巨蟹座">巨蟹座</option>
                <option value="狮子座">狮子座</option>
                <option value="处女座">处女座</option>
                <option value="天秤座">天秤座</option>
                <option value="天蝎座">天蝎座</option>
                <option value="射手座">射手座</option>
                <option value="摩羯座">摩羯座</option>
                <option value="水瓶座">水瓶座</option>
                <option value="双鱼座">双鱼座</option>
              </select>
            </div>
          </Grid.Item>
        </Grid>
        <div className="form-group">
          <label>行当</label>
          <input
            name="occupation"
            type="text"
            value={member.occupation}
            onChange={(e) =>
              setMember({ ...member, occupation: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>志趣</label>
          <input
            name="interest"
            type="text"
            value={member.interest}
            onChange={(e) => setMember({ ...member, interest: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>通讯</label>
          <input
            name="contact"
            type="text"
            value={member.contact}
            onChange={(e) => setMember({ ...member, contact: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>简述</label>
          <textarea
            name="intro"
            value={member.intro}
            onChange={(e) => setMember({ ...member, intro: e.target.value })}
            rows={4}
          />
        </div>
        {/* 新增按钮 */}
        <div className="form-group btns-wrap">
          <Grid columns={2} gap={10}>
            <Grid.Item>
              <button className="fullWidth" onClick={handleSave}>
                保存
              </button>
            </Grid.Item>
            <Grid.Item>
              <button className="fullWidth btn-info" onClick={handleClose}>
                取消
              </button>
            </Grid.Item>
          </Grid>
        </div>
      </form>
    </div>
  );
}
