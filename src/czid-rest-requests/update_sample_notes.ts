import { makeCZIDRestRequest, toCamelCase } from "../helpers";
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
  var output = await res.json();
  output = toCamelCase(output);
  return output;
};
