import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import React from 'react';
import { Typography } from '@strapi/design-system';


const name = pluginPkg.strapi.name;


export const formatDate = (date, locale) => {
  if (date) {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(new Date(date));
  }
  return null;
};

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  bootstrap(app) {
        app.registerHook(
          'Admin/CM/pages/ListView/inject-column-in-table',
          ({ displayedHeaders, layout }) => {


            const modifiedDisplayedHeaders = displayedHeaders.map((header) => {

              if(header?.fieldSchema?.type === "datetime") {
                return {
                  ...header,
                  key: header.key,
                  name: header.name,
                  fieldSchema: header.fieldSchema,
                  metadatas: header.metadatas,
                  cellFormatter: (value) => {
                    const currentVal = value[header.name];
                    return <Typography variant="omega">{formatDate(currentVal, "uk") }</Typography>
                  }
                }
              } else {
                return header
              }
            })
            return {
              layout,
              displayedHeaders:modifiedDisplayedHeaders,
            };
          }
        );



  }
};
