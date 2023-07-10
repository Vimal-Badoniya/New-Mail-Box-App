import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getInbox = createAsyncThunk("get-inbox", async () => {
  const user = localStorage.getItem("user");
  const userId = user.replace(/\./g, "");
  const response = await fetch(
    `https://mail-box-1-default-rtdb.firebaseio.com/${userId}/Inbox.json`
  );
  const data = await response.json();
  return data;
});

export const getSentbox = createAsyncThunk("get-sentbox", async () => {
  const user = localStorage.getItem("user");
  const userId = user.replace(/\./g, "");
  const response = await fetch(
    `https://mail-box-1-default-rtdb.firebaseio.com/${userId}/Sentbox.json`
  );
  const data = await response.json();
  return data;
});

export const sendMail = createAsyncThunk("send-a-mail", async (obj) => {
  const receiver = obj.mailTo.replace(/\./g, "");
  const response = fetch(
    `https://mail-box-1-default-rtdb.firebaseio.com/${receiver}/Inbox.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }
  );
  const data = (await response).json();
  return data;
});

export const updateSentbox = createAsyncThunk("update-sentbox", async (obj) => {
  const sender = obj.mailFrom.replace(/\./g, "");
  const response = fetch(
    `https://mail-box-1-default-rtdb.firebaseio.com/${sender}/Sentbox.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }
  );
  const data = (await response).json();
  return data;
});

export const mailRead = createAsyncThunk("mail-read", async (obj) => {
  const user = obj.mailTo.replace(/\./g, "");
  const ID = obj.id;
  const response = fetch(
    `https://mail-box-1-default-rtdb.firebaseio.com/${user}/Inbox/${ID}.json`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ readStatus: true }),
    }
  );
  const data = (await response).json();
  return data;
});

export const deleteMail = createAsyncThunk("", async (obj) => {
  const user = obj.mailTo.replace(/\./g, "");
  const ID = obj.id;
 const response = await fetch(`https://mail-box-1-default-rtdb.firebaseio.com/${user}/Inbox/${ID}.json`, {
    method: "DELETE",
    headers : {
      'Application-Type' : 'application/json'
    }
  });
  const data = await response.json()
  return data
});

const EmailSlice = createSlice({
  name: "email-slice",
  initialState: {
    inbox: {},
    sentbox: {},
  },
  reducers: {
    clearProfile: (state, action) => {
      return {
        inbox: {},
        sentbox: {},
      };
    },
    clearInbox : (state , action)=>{
      return {
        ...state ,
        inbox : {}
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getInbox.fulfilled, (state, action) => {
      if (action.payload !== null) {
        return { ...state, inbox: action.payload };
      }
    });
    builder.addCase(getSentbox.fulfilled, (state, action) => {
      if (action.payload !== null) {
        return { ...state, sentbox: action.payload };
      }
    });
    builder.addCase(deleteMail.fulfilled , (state , action)=>{
      //console.log(action.payload)
    })
    builder.addCase(deleteMail.rejected , (state , action)=>{
      console.log(action.payload)
    })
  },
});

export const { clearProfile , clearInbox} = EmailSlice.actions;
export default EmailSlice.reducer;
