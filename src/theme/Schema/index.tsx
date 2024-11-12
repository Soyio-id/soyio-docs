/* eslint-disable */

import React from 'react';

// @ts-ignore
import { ClosingArrayBracket, OpeningArrayBracket } from '@theme/ArrayBrackets';
import Details from '@theme/Details';
// @ts-ignore
import DiscriminatorTabs from '@theme/DiscriminatorTabs';
// @ts-ignore
import SchemaItem from '@theme/SchemaItem';
// @ts-ignore
import SchemaTabs from '@theme/SchemaTabs';
import TabItem from '@theme/TabItem';
// eslint-disable-next-line import/no-extraneous-dependencies
import { merge } from 'allof-merge';
import clsx from 'clsx';
import { createDescription } from 'docusaurus-plugin-openapi-docs/lib/markdown/createDescription';
import {
  getQualifierMessage,
  getSchemaName,
} from 'docusaurus-plugin-openapi-docs/lib/markdown/schema';
import { SchemaObject } from 'docusaurus-plugin-openapi-docs/lib/openapi/types';
// @ts-ignore
import isEmpty from 'lodash/isEmpty';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

// eslint-disable-next-line import/no-extraneous-dependencies
// const jsonSchemaMergeAllOf = require("json-schema-merge-allof");

const mergeAllOf = (allOf: any) => {
  const onMergeError = (msg: string) => {
    console.warn(msg);
  };

  const mergedSchemas = merge(allOf, { onMergeError });

  return mergedSchemas;
};

interface MarkdownProps {
  text: string | undefined;
}

// Renders string as markdown, useful for descriptions and qualifiers
const Markdown: React.FC<MarkdownProps> = ({ text }) => {
  return (
    <div style={{ marginTop: '.5rem', marginBottom: '.5rem' }}>
      <ReactMarkdown
        children={createDescription(text)}
        // @ts-ignore
        rehypePlugins={[rehypeRaw]}
      />
    </div>
  );
};

interface SummaryProps {
  name: string;
  schemaName: string | undefined;
  schema: {
    deprecated?: boolean;
    nullable?: boolean;
  };
  required?: boolean | string[];
}

const Summary: React.FC<SummaryProps> = ({
  name,
  schemaName,
  schema,
  required,
}) => {
  const { deprecated, nullable } = schema;

  const isRequired = Array.isArray(required)
    ? required.includes(name)
    : required === true;

  return (
    <summary>
      <span className="openapi-schema__container">
        <strong
          className={clsx('openapi-schema__property', {
            'openapi-schema__strikethrough': deprecated,
          })}
        >
          {name}
        </strong>
        <span className="openapi-schema__name"> {schemaName}</span>
        {(isRequired || deprecated || nullable) && (
          <span className="openapi-schema__divider" />
        )}
        {nullable && <span className="openapi-schema__nullable">nullable</span>}
        {isRequired && (
          <span className="openapi-schema__required">required</span>
        )}
        {deprecated && (
          <span className="openapi-schema__deprecated">deprecated</span>
        )}
      </span>
    </summary>
  );
};

// Common props interface
interface SchemaProps {
  schema: SchemaObject;
  schemaType: 'request' | 'response';
  defaultCollapsibleOpen?: boolean;
}

const AnyOneOf: React.FC<SchemaProps> = ({
  schema,
  schemaType,
  defaultCollapsibleOpen,
}) => {
  const type = schema.oneOf ? 'oneOf' : 'anyOf';
  return (
    <>
      <span
        className="badge badge--info"
        style={{ marginBottom: '1rem' }}
      >
        {type}
      </span>
      <SchemaTabs>
        {schema[type]?.map((anyOneSchema: any, index: number) => {
          const label = anyOneSchema.title || `MOD${index + 1}`;
          return (
            // @ts-ignore
            <TabItem
              key={index}
              label={label}
              value={`${index}-item-properties`}
            >
              {/* Handle primitive types directly */}
              {['string', 'number', 'integer', 'boolean'].includes(
                anyOneSchema.type,
              ) && (
                <SchemaItem
                  collapsible={false}
                  name={undefined}
                  schemaName={anyOneSchema.type}
                  qualifierMessage={getQualifierMessage(anyOneSchema)}
                  schema={anyOneSchema}
                  discriminator={false}
                  children={null}
                />
              )}

              {/* Handle empty object as a primitive type */}
              {anyOneSchema.type === 'object' &&
                !anyOneSchema.properties &&
                !anyOneSchema.allOf &&
                !anyOneSchema.oneOf &&
                !anyOneSchema.anyOf && (
                  <SchemaItem
                    collapsible={false}
                    name={undefined}
                    schemaName={anyOneSchema.type}
                    qualifierMessage={getQualifierMessage(anyOneSchema)}
                    schema={anyOneSchema}
                    discriminator={false}
                    children={null}
                  />
                )}

              {/* Handle actual object types with properties or nested schemas */}
              {anyOneSchema.type === 'object' && anyOneSchema.properties && (
                <Properties
                  schema={anyOneSchema}
                  schemaType={schemaType}
                  defaultCollapsibleOpen={defaultCollapsibleOpen}
                />
              )}
              {anyOneSchema.allOf && (
                <SchemaNode
                  schema={anyOneSchema}
                  schemaType={schemaType}
                  defaultCollapsibleOpen={defaultCollapsibleOpen}
                />
              )}
              {anyOneSchema.oneOf && (
                <SchemaNode
                  schema={anyOneSchema}
                  schemaType={schemaType}
                  defaultCollapsibleOpen={defaultCollapsibleOpen}
                />
              )}
              {anyOneSchema.anyOf && (
                <SchemaNode
                  schema={anyOneSchema}
                  schemaType={schemaType}
                  defaultCollapsibleOpen={defaultCollapsibleOpen}
                />
              )}
              {anyOneSchema.items && (
                <Items
                  schema={anyOneSchema}
                  schemaType={schemaType}
                  defaultCollapsibleOpen={defaultCollapsibleOpen}
                />
              )}
            </TabItem>
          );
        })}
      </SchemaTabs>
    </>
  );
};

const Properties: React.FC<SchemaProps> = ({
  schema,
  schemaType,
  defaultCollapsibleOpen,
}) => {
  const discriminator = schema.discriminator;
  if (discriminator && !discriminator.mapping) {
    const anyOneOf = schema.oneOf ?? schema.anyOf ?? {};
    const inferredMapping = {} as any;
    Object.entries(anyOneOf).map(([_, anyOneSchema]: [string, any]) => {
      // ensure discriminated property only renders once
      if (
        schema.properties![discriminator.propertyName] &&
        anyOneSchema.properties[discriminator.propertyName]
      )
        delete anyOneSchema.properties[discriminator.propertyName];
      return (inferredMapping[anyOneSchema.title] = anyOneSchema);
    });
    discriminator['mapping'] = inferredMapping;
  }
  if (Object.keys(schema.properties as {}).length === 0) {
    return (
      <SchemaItem
        collapsible={false}
        name=""
        required={false}
        schemaName="object"
        qualifierMessage={undefined}
        schema={{}}
      />
    );
  }

  return (
    <>
      {Object.entries(schema.properties as {}).map(
        ([key, val]: [string, any]) => (
          <SchemaEdge
            key={key}
            name={key}
            schema={val}
            required={
              Array.isArray(schema.required)
                ? schema.required.includes(key)
                : false
            }
            discriminator={discriminator}
            schemaType={schemaType}
            defaultCollapsibleOpen={defaultCollapsibleOpen}
          />
        ),
      )}
    </>
  );
};

const PropertyDiscriminator: React.FC<SchemaEdgeProps> = ({
  name,
  schemaName,
  schema,
  schemaType,
  discriminator,
  required,
  defaultCollapsibleOpen,
}) => {
  if (!schema) {
    return null;
  }

  return (
    <>
      <div className="openapi-discriminator__item openapi-schema__list-item">
        <div>
          <span className="openapi-schema__container">
            <strong className="openapi-discriminator__name openapi-schema__property">
              {name}
            </strong>
            {schemaName && (
              <span className="openapi-schema__name"> {schemaName}</span>
            )}
            {required && <span className="openapi-schema__divider"></span>}
            {required && (
              <span className="openapi-schema__required">required</span>
            )}
          </span>
          <div style={{ marginLeft: '1rem' }}>
            {schema.description && <Markdown text={schema.description} />}
            {getQualifierMessage(discriminator) && (
              <Markdown text={getQualifierMessage(discriminator)} />
            )}
          </div>
          <DiscriminatorTabs className="openapi-tabs__discriminator">
            {Object.keys(discriminator.mapping).map((key, index) => (
              // @ts-ignore
              <TabItem
                key={index}
                label={key}
                value={`${index}-item-discriminator`}
              >
                <SchemaNode
                  schema={discriminator.mapping[key]}
                  schemaType={schemaType}
                  defaultCollapsibleOpen={defaultCollapsibleOpen}
                />
              </TabItem>
            ))}
          </DiscriminatorTabs>
        </div>
      </div>
      {schema.properties &&
        Object.entries(schema.properties as {}).map(
          ([key, val]: [string, any]) =>
            key !== discriminator.propertyName && (
              <SchemaEdge
                key={key}
                name={key}
                schema={val}
                required={
                  Array.isArray(schema.required)
                    ? schema.required.includes(key)
                    : false
                }
                discriminator={false}
                schemaType={schemaType}
                defaultCollapsibleOpen={defaultCollapsibleOpen}
              />
            ),
        )}
    </>
  );
};

interface DiscriminatorNodeProps {
  discriminator: any;
  schema: SchemaObject;
  schemaType: 'request' | 'response';
  defaultCollapsibleOpen?: boolean;
}

const DiscriminatorNode: React.FC<DiscriminatorNodeProps> = ({
  discriminator,
  schema,
  schemaType,
  defaultCollapsibleOpen,
}) => {
  let discriminatedSchemas: any = {};
  const inferredMapping: any = {};

  const discriminatorProperty = schema.properties![discriminator.propertyName];

  if (schema.allOf) {
    const mergedSchemas = mergeAllOf(schema) as SchemaObject;
    if (mergedSchemas.oneOf || mergedSchemas.anyOf) {
      discriminatedSchemas = mergedSchemas.oneOf || mergedSchemas.anyOf;
    }
  } else if (schema.oneOf || schema.anyOf) {
    discriminatedSchemas = schema.oneOf || schema.anyOf;
  }

  // Handle case where no mapping is defined
  if (!discriminator.mapping) {
    Object.entries(discriminatedSchemas).forEach(
      ([_, subschema]: [string, any], index) => {
        inferredMapping[subschema.title ?? `PROP${index}`] = subschema;
      },
    );
    discriminator.mapping = inferredMapping;
  }

  // Merge sub schema discriminator property with parent
  Object.keys(discriminator.mapping).forEach((key) => {
    const subSchema = discriminator.mapping[key];

    // Handle discriminated schema with allOf
    let mergedSubSchema = {} as SchemaObject;
    if (subSchema.allOf) {
      mergedSubSchema = mergeAllOf(subSchema) as SchemaObject;
    }

    const subProperties = subSchema.properties || mergedSubSchema.properties;
    if (subProperties[discriminator.propertyName]) {
      schema.properties![discriminator.propertyName] = {
        ...schema.properties![discriminator.propertyName],
        ...subProperties[discriminator.propertyName],
      };
      if (subSchema.required && !schema.required) {
        schema.required = subSchema.required;
      }
      // Avoid duplicating property
      delete subProperties[discriminator.propertyName];
    }
  });

  const name = discriminator.propertyName;
  const schemaName = getSchemaName(discriminatorProperty);

  // Default case for discriminator without oneOf/anyOf/allOf
  return (
    <PropertyDiscriminator
      name={name}
      schemaName={schemaName}
      schema={schema}
      schemaType={schemaType}
      discriminator={discriminator}
      required={
        Array.isArray(schema.required)
          ? schema.required.includes(name)
          : schema.required
      }
      defaultCollapsibleOpen={defaultCollapsibleOpen}
    />
  );
};

const AdditionalProperties: React.FC<SchemaProps> = ({
  schema,
  schemaType,
  defaultCollapsibleOpen,
}) => {
  const additionalProperties = schema.additionalProperties;

  if (!additionalProperties) return null;

  // Handle free-form objects
  if (additionalProperties === true || isEmpty(additionalProperties)) {
    return (
      <SchemaItem
        name="property name*"
        required={false}
        schemaName="any"
        qualifierMessage={getQualifierMessage(schema)}
        schema={schema}
        collapsible={false}
        discriminator={false}
      />
    );
  }

  // Handle objects, arrays, complex schemas
  if (
    additionalProperties.properties ||
    additionalProperties.items ||
    additionalProperties.allOf ||
    additionalProperties.additionalProperties ||
    additionalProperties.oneOf ||
    additionalProperties.anyOf
  ) {
    const title =
      additionalProperties.title || getSchemaName(additionalProperties);
    const required = schema.required || false;
    return (
      <SchemaNodeDetails
        name="property name*"
        schemaName={title}
        required={required}
        nullable={schema.nullable}
        schema={additionalProperties}
        schemaType={schemaType}
        defaultCollapsibleOpen={defaultCollapsibleOpen}
      />
    );
  }

  // Handle primitive types
  if (
    additionalProperties.type === 'string' ||
    additionalProperties.type === 'boolean' ||
    additionalProperties.type === 'integer' ||
    additionalProperties.type === 'number' ||
    additionalProperties.type === 'object'
  ) {
    const schemaName = getSchemaName(additionalProperties);
    return (
      <SchemaItem
        name="property name*"
        required={false}
        schemaName={schemaName}
        qualifierMessage={getQualifierMessage(schema)}
        schema={additionalProperties}
        collapsible={false}
        discriminator={false}
        children={null}
      />
    );
  }

  // Unknown type
  return null;
};

const SchemaNodeDetails: React.FC<SchemaEdgeProps> = ({
  name,
  schemaName,
  schema,
  required,
  schemaType,
  defaultCollapsibleOpen,
}) => {
  return (
    <SchemaItem collapsible={true}>
      <Details
        className="openapi-markdown__details"
        open={defaultCollapsibleOpen}
        summary={
          <Summary
            name={name}
            schemaName={schemaName}
            schema={schema}
            required={required}
          />
        }
      >
        <div style={{ marginLeft: '1rem' }}>
          {schema.description && <Markdown text={schema.description} />}
          {getQualifierMessage(schema) && (
            <Markdown text={getQualifierMessage(schema)} />
          )}
          <SchemaNode
            schema={schema}
            schemaType={schemaType}
            defaultCollapsibleOpen={defaultCollapsibleOpen}
          />
        </div>
      </Details>
    </SchemaItem>
  );
};

const Items: React.FC<{
  schema: any;
  schemaType: 'request' | 'response';
  defaultCollapsibleOpen?: boolean;
}> = ({ schema, schemaType, defaultCollapsibleOpen }) => {
  // Handles case when schema.items has properties
  if (schema.items?.properties) {
    return (
      <>
        <OpeningArrayBracket />
        <Properties
          schema={schema.items}
          schemaType={schemaType}
          defaultCollapsibleOpen={defaultCollapsibleOpen}
        />
        <ClosingArrayBracket />
      </>
    );
  }

  // Handles case when schema.items has additionalProperties
  if (schema.items?.additionalProperties) {
    return (
      <>
        <OpeningArrayBracket />
        <AdditionalProperties
          schema={schema.items}
          schemaType={schemaType}
          defaultCollapsibleOpen={defaultCollapsibleOpen}
        />
        <ClosingArrayBracket />
      </>
    );
  }

  // Handles case when schema.items has oneOf or anyOf
  if (schema.items?.oneOf || schema.items?.anyOf) {
    return (
      <>
        <OpeningArrayBracket />
        <AnyOneOf
          schema={schema.items}
          schemaType={schemaType}
          defaultCollapsibleOpen={defaultCollapsibleOpen}
        />
        <ClosingArrayBracket />
      </>
    );
  }

  // Handles case when schema.items has allOf
  if (schema.items?.allOf) {
    const mergedSchemas = mergeAllOf(schema.items) as SchemaObject;

    // Handles combo anyOf/oneOf + properties
    if (
      (mergedSchemas.oneOf || mergedSchemas.anyOf) &&
      mergedSchemas.properties
    ) {
      return (
        <>
          <OpeningArrayBracket />
          <AnyOneOf
            schema={mergedSchemas}
            schemaType={schemaType}
            defaultCollapsibleOpen={defaultCollapsibleOpen}
          />
          <Properties
            schema={mergedSchemas}
            schemaType={schemaType}
            defaultCollapsibleOpen={defaultCollapsibleOpen}
          />
          <ClosingArrayBracket />
        </>
      );
    }

    // Handles only anyOf/oneOf
    if (mergedSchemas.oneOf || mergedSchemas.anyOf) {
      return (
        <>
          <OpeningArrayBracket />
          <AnyOneOf
            schema={mergedSchemas}
            schemaType={schemaType}
            defaultCollapsibleOpen={defaultCollapsibleOpen}
          />
          <ClosingArrayBracket />
        </>
      );
    }

    // Handles properties
    if (mergedSchemas.properties) {
      return (
        <>
          <OpeningArrayBracket />
          <Properties
            schema={mergedSchemas}
            schemaType={schemaType}
            defaultCollapsibleOpen={defaultCollapsibleOpen}
          />
          <ClosingArrayBracket />
        </>
      );
    }
  }

  // Handles basic types (string, number, integer, boolean, object)
  if (
    schema.items?.type === 'string' ||
    schema.items?.type === 'number' ||
    schema.items?.type === 'integer' ||
    schema.items?.type === 'boolean' ||
    schema.items?.type === 'object'
  ) {
    return (
      <div style={{ marginLeft: '.5rem' }}>
        <OpeningArrayBracket />
        <SchemaItem
          collapsible={false}
          name="" // No name for array items
          schemaName={getSchemaName(schema.items)}
          qualifierMessage={getQualifierMessage(schema.items)}
          schema={schema.items}
          discriminator={false}
          children={null}
        />
        <ClosingArrayBracket />
      </div>
    );
  }

  // Handles fallback case (use createEdges logic)
  return (
    <>
      <OpeningArrayBracket />
      {Object.entries(schema.items || {}).map(([key, val]: [string, any]) => (
        <SchemaEdge
          key={key}
          name={key}
          schema={val}
          schemaType={schemaType}
          required={
            Array.isArray(schema.required)
              ? schema.required.includes(key)
              : false
          }
          defaultCollapsibleOpen={defaultCollapsibleOpen}
        />
      ))}
      <ClosingArrayBracket />
    </>
  );
};

interface SchemaEdgeProps {
  name: string;
  schemaName?: string;
  schema: SchemaObject;
  required?: boolean | string[];
  nullable?: boolean | undefined;
  discriminator?: any;
  schemaType: 'request' | 'response';
  defaultCollapsibleOpen?: boolean;
}

const SchemaEdge: React.FC<SchemaEdgeProps> = ({
  name,
  schema,
  required,
  discriminator,
  schemaType,
  defaultCollapsibleOpen,
}) => {
  if (
    (schemaType === 'request' && schema.readOnly) ||
    (schemaType === 'response' && schema.writeOnly)
  ) {
    return null;
  }

  const schemaName = getSchemaName(schema);

  if (discriminator && discriminator.propertyName === name) {
    return (
      <PropertyDiscriminator
        name={name}
        schemaName={schemaName}
        schema={schema}
        schemaType={schemaType}
        discriminator={discriminator}
        required={required}
        defaultCollapsibleOpen={defaultCollapsibleOpen}
      />
    );
  }

  if (schema.oneOf || schema.anyOf) {
    // return <AnyOneOf schema={schema} schemaType={schemaType} />;
    return (
      <SchemaNodeDetails
        defaultCollapsibleOpen={defaultCollapsibleOpen}
        name={name}
        schemaName={schemaName}
        schemaType={schemaType}
        required={required}
        schema={schema}
        nullable={schema.nullable}
      />
    );
  }

  if (schema.properties) {
    return (
      <SchemaNodeDetails
        defaultCollapsibleOpen={defaultCollapsibleOpen}
        name={name}
        schemaName={schemaName}
        schemaType={schemaType}
        required={required}
        schema={schema}
        nullable={schema.nullable}
      />
    );
  }

  if (schema.additionalProperties) {
    return (
      <SchemaNodeDetails
        defaultCollapsibleOpen={defaultCollapsibleOpen}
        name={name}
        schemaName={schemaName}
        schemaType={schemaType}
        required={required}
        schema={schema}
        nullable={schema.nullable}
      />
    );
  }

  if (schema.items?.properties) {
    return (
      <SchemaNodeDetails
        defaultCollapsibleOpen={defaultCollapsibleOpen}
        name={name}
        schemaName={schemaName}
        required={required}
        nullable={schema.nullable}
        schema={schema}
        schemaType={schemaType}
      />
    );
  }

  if (schema.items?.anyOf || schema.items?.oneOf) {
    return (
      <SchemaNodeDetails
        defaultCollapsibleOpen={defaultCollapsibleOpen}
        name={name}
        schemaName={schemaName}
        required={required}
        nullable={schema.nullable}
        schema={schema}
        schemaType={schemaType}
      />
    );
  }

  if (schema.allOf) {
    // handle circular properties
    if (
      schema.allOf &&
      schema.allOf.length &&
      schema.allOf.length === 1 &&
      typeof schema.allOf[0] === 'string'
    ) {
      return (
        <SchemaItem
          collapsible={false}
          name={name}
          required={
            Array.isArray(required) ? required.includes(name) : required
          }
          schemaName={schema.allOf[0]}
          qualifierMessage={undefined}
          schema={schema.allOf[0]}
          discriminator={false}
          children={null}
        />
      );
    }
    const mergedSchemas = mergeAllOf(schema) as SchemaObject;

    if (
      (schemaType === 'request' && mergedSchemas.readOnly) ||
      (schemaType === 'response' && mergedSchemas.writeOnly)
    ) {
      return null;
    }

    const mergedSchemaName = getSchemaName(mergedSchemas);

    if (mergedSchemas.oneOf || mergedSchemas.anyOf) {
      return (
        <SchemaNodeDetails
          defaultCollapsibleOpen={defaultCollapsibleOpen}
          name={name}
          schemaName={mergedSchemaName}
          required={
            Array.isArray(mergedSchemas.required)
              ? mergedSchemas.required.includes(name)
              : mergedSchemas.required
          }
          nullable={mergedSchemas.nullable}
          schema={mergedSchemas}
          schemaType={schemaType}
        />
      );
    }

    if (mergedSchemas.properties !== undefined) {
      return (
        <SchemaNodeDetails
          defaultCollapsibleOpen={defaultCollapsibleOpen}
          name={name}
          schemaName={mergedSchemaName}
          required={
            Array.isArray(mergedSchemas.required)
              ? mergedSchemas.required.includes(name)
              : mergedSchemas.required
          }
          nullable={mergedSchemas.nullable}
          schema={mergedSchemas}
          schemaType={schemaType}
        />
      );
    }

    if (mergedSchemas.items?.properties) {
      <SchemaNodeDetails
        defaultCollapsibleOpen={defaultCollapsibleOpen}
        name={name}
        schemaName={mergedSchemaName}
        required={
          Array.isArray(mergedSchemas.required)
            ? mergedSchemas.required.includes(name)
            : mergedSchemas.required
        }
        nullable={mergedSchemas.nullable}
        schema={mergedSchemas}
        schemaType={schemaType}
      />;
    }

    return (
      <SchemaItem
        collapsible={false}
        name={name}
        required={Array.isArray(required) ? required.includes(name) : required}
        schemaName={mergedSchemaName}
        qualifierMessage={getQualifierMessage(mergedSchemas)}
        schema={mergedSchemas}
        discriminator={false}
        children={null}
      />
    );
  }

  return (
    <SchemaItem
      collapsible={false}
      name={name}
      required={Array.isArray(required) ? required.includes(name) : required}
      schemaName={schemaName}
      qualifierMessage={getQualifierMessage(schema)}
      schema={schema}
      discriminator={false}
      children={null}
    />
  );
};

const SchemaNode: React.FC<SchemaProps> = ({
  schema,
  schemaType,
  defaultCollapsibleOpen,
}) => {
  if (
    (schemaType === 'request' && schema.readOnly) ||
    (schemaType === 'response' && schema.writeOnly)
  ) {
    return null;
  }

  if (schema.discriminator) {
    const { discriminator } = schema;
    return (
      <DiscriminatorNode
        defaultCollapsibleOpen={defaultCollapsibleOpen}
        discriminator={discriminator}
        schema={schema}
        schemaType={schemaType}
      />
    );
  }

  // Handle allOf, oneOf, anyOf without discriminators
  if (schema.allOf) {
    const mergedSchemas = mergeAllOf(schema) as SchemaObject;

    if (
      (schemaType === 'request' && mergedSchemas.readOnly) ||
      (schemaType === 'response' && mergedSchemas.writeOnly)
    ) {
      return null;
    }

    return (
      <div>
        {mergedSchemas.oneOf && (
          <AnyOneOf
            schema={mergedSchemas}
            schemaType={schemaType}
            defaultCollapsibleOpen={defaultCollapsibleOpen}
          />
        )}
        {mergedSchemas.anyOf && (
          <AnyOneOf
            schema={mergedSchemas}
            schemaType={schemaType}
            defaultCollapsibleOpen={defaultCollapsibleOpen}
          />
        )}
        {mergedSchemas.properties && (
          <Properties
            schema={mergedSchemas}
            schemaType={schemaType}
            defaultCollapsibleOpen={defaultCollapsibleOpen}
          />
        )}
        {mergedSchemas.items && (
          <Items
            schema={mergedSchemas}
            schemaType={schemaType}
            defaultCollapsibleOpen={defaultCollapsibleOpen}
          />
        )}
      </div>
    );
  }

  if (schema.oneOf || schema.anyOf) {
    return (
      <AnyOneOf
        schema={schema}
        schemaType={schemaType}
        defaultCollapsibleOpen={defaultCollapsibleOpen}
      />
    );
  }

  // Handle primitives
  if (
    schema.type &&
    !schema.oneOf &&
    !schema.anyOf &&
    !schema.properties &&
    !schema.allOf &&
    !schema.items &&
    !schema.additionalProperties
  ) {
    const schemaName = getSchemaName(schema);
    return (
      <SchemaItem
        collapsible={false}
        name={schema.type}
        required={Boolean(schema.required)}
        schemaName={schemaName}
        qualifierMessage={getQualifierMessage(schema)}
        schema={schema}
        discriminator={false}
        children={null}
      />
    );
  }

  return (
    <div>
      {schema.oneOf && (
        <AnyOneOf
          schema={schema}
          schemaType={schemaType}
          defaultCollapsibleOpen={defaultCollapsibleOpen}
        />
      )}
      {schema.anyOf && (
        <AnyOneOf
          schema={schema}
          schemaType={schemaType}
          defaultCollapsibleOpen={defaultCollapsibleOpen}
        />
      )}
      {schema.properties && (
        <Properties
          schema={schema}
          schemaType={schemaType}
          defaultCollapsibleOpen={defaultCollapsibleOpen}
        />
      )}
      {schema.additionalProperties && (
        <AdditionalProperties
          schema={schema}
          schemaType={schemaType}
          defaultCollapsibleOpen={defaultCollapsibleOpen}
        />
      )}
      {schema.items && (
        <Items
          schema={schema}
          schemaType={schemaType}
          defaultCollapsibleOpen={defaultCollapsibleOpen}
        />
      )}
    </div>
  );
};

export default SchemaNode;