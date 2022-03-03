import React, { Component } from 'react';
import { useState } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import axios from 'axios';
import Marketplace from "../../abis/Marketplace.json";
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useWeb3React } from '@web3-react/core';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

function Creator() {
  const { active, chainId, account, error } = useWeb3React();
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })

  async function onChange(e) {
    const file = e.target.files[0]
    console.log(file);
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }
  async function uploadToIPFS() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function listNFTForSale() {
    const url = await uploadToIPFS()
    console.log(url);
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    console.log(connection);
    const provider = new ethers.providers.Web3Provider(connection)
    console.log(provider);
    const signer = provider.getSigner()

    console.log(signer);

    /* next, create the item */
    const price = ethers.utils.parseUnits(formInput.price, 'ether')
    let contract = new ethers.Contract("0x2e07137263DdA7B7A2a92f78D9B3bbf28e29FF85", Marketplace.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()
    let transaction = await contract.createToken(url, price, { value: listingPrice })
    await transaction.wait()
  }

  return (
    <div>
      <h1>Helloo</h1>
      <h1>Helloo</h1>

      <h1>{account}</h1>
      <div className="flex justify-center">
        <div className="w-1/2 flex flex-col pb-12">
          <input
            placeholder="Asset Name"
            className="mt-8 border rounded p-4"
            onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
          />
          <textarea
            placeholder="Asset Description"
            className="mt-2 border rounded p-4"
            onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
          />
          <input
            placeholder="Asset Price in Eth"
            className="mt-2 border rounded p-4"
            onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
          />
          <input
            type="file"
            name="Asset"
            className="my-4"
            onChange={onChange}
          />
          {
            fileUrl && (
              <img className="rounded mt-4" width="350" src={fileUrl} />
            )
          }
          <button onClick={listNFTForSale} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
            Create NFT
          </button>
        </div>
      </div>
    </div>
  )
}

export default Creator

