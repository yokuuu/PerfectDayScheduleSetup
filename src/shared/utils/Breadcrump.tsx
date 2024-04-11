//@ts-nocheck
'use client';
import React from 'react'
import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { Link } from 'react-router-dom';

interface Props {
  firstValue: string;
  secondValue: string;
}

export function BreadcrumbComponent({ firstValue, secondValue }: Props) {
  return (
    <Breadcrumb aria-label="Default breadcrumb example">
      <Breadcrumb.Item icon={HiHome}>
        <Link className='text-black text-lg' to={'/'}>
        {firstValue}
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item >
        <p className='text-black text-lg'>
        {secondValue}
        </p>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}