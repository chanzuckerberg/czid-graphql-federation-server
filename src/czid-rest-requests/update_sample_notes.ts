import { makeCZIDRestRequest, toCamelCase } from "../helpers.js";
import { FormData } from "node-fetch";

export const updateSampleNotes = async (parent, args, contextValue, info) => {
  const sampleId = args.sampleId;
  const notes = args.value;
  const authenticityToken = args.authenticityToken;
  const requestHeaders = contextValue.headers;

  const formData = new FormData();
  formData.set("field", "sample_notes");
  formData.set("value", notes);
  formData.set("authenticity_token", authenticityToken);

  const res = await makeCZIDRestRequest(
    "samples/" + sampleId + "/save_metadata", 
    requestHeaders, 
    "POST", 
    formData
  );
  const jsonResponse = await res.json();
  let output = {};
  if (typeof jsonResponse === "object") {
    output = toCamelCase({
      ...jsonResponse,
      data: {
        id: sampleId,
        sampleNotes: notes,
      },
    });
  } else {
    output = toCamelCase({
      status: "error",
      message: "Error updating sample notes",
      errors: [jsonResponse],
      data: {
        id: sampleId,
        sampleNotes: notes,
      },
    });
  }

  return output;
};
