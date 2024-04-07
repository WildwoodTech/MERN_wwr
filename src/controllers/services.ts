import serviceModel from '../models/service';
import db from '../database/db';
import { ExpressHandler } from '../types';

// @desc    Get all services
// @route   GET /api/v5/services
// @access  Public
export const getServices: ExpressHandler = async (req, res, next) => {
  try {
    const services = await serviceModel.find({});
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// @desc    Get single service
// @route   GET /api/v5/services/:id
// @access  Private
export const getService: ExpressHandler = async (req, res, next) => {
  try {
    const service = await serviceModel.findById(req.params.id);

    if (!service) {
      res.status(404).json({
        succes: false,
        message: `Service with id: ${req.params.id} not found!`,
      });
    }

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// @desc    Create new service
// @route   POST /api/v5/services
// @access  Private
export const createService: ExpressHandler = async (req, res, next) => {
  try {
    const service = await serviceModel.create(req.body);

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// @desc    Update single service
// @route   PUT /api/v5/services/:id
// @access  Private
export const updateService: ExpressHandler = async (req, res, next) => {
  try {
    const service = await serviceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!service) {
      return res.status(404).json({
        succes: false,
        message: `Service with id: ${req.params.id} not found!`,
      });
    }

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// @desc    Delete single service
// @route   DELETE /api/v5/services/:id
// @access  Private
export const deleteService: ExpressHandler = async (req, res, next) => {
  try {
    const service = await serviceModel.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        succes: false,
        message: `Service with id: ${req.params.id} not found!`,
      });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
